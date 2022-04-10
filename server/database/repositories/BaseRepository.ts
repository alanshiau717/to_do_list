// import { Query } from "tsoa";
import {
    FindConditions,
    FindManyOptions,
    FindOneOptions,
    QueryFailedError,
    Repository,
    // UpdateResult,
    // DeepPartial
  } from "typeorm";
// import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
//   import { environment } from "../../environment";
  import { BaseEntity, IBaseEntity } from "../entity/base";
  import { getDbConnection } from "../getDbConnection";
  import { PostgresError } from "../postgres/PostgresError";
  
  /**
   * The generic type arguments for BaseRepository seem a little convoluted,
   * but there's a strategy in mind. TypeORM uses classes and class decorators
   * to set up establish ORM models and model relations.
   *
   * By only accepting and producing the interface version of models, we can keep
   * the class models from propagating throughout the app and allows repositories
   * to run on pure data structures
   */
  export abstract class BaseRepository<
    // Properties in an existing record
    Props extends IBaseEntity,
    // Class representing TypeORM model
    Class extends BaseEntity & Props,
    // Properties required to create this record
    CreateProps
    // Properties required to update this record
  > {
    constructor(private readonly classFn: new () => Class) {}
  
    public findOne(options: FindOneOptions<Class>): Promise<Props | undefined> {
      return this.execute((repo) => repo.findOne(options));
    }

    public findOneById(id: string | number | Date, options: FindOneOptions<Class> ) : Promise<Props | undefined> {
      return this.execute((repo) => repo.findOne(id, options))
    }
  
    public find(options: FindManyOptions<Class>): Promise<Props[]> {
      return this.execute((repo) => repo.find(options));
    }
  
    public create(model: CreateProps): Promise<Props> {
      const now = new Date();
  
      return this.execute((repo) =>
        repo.save({
          ...model,
          date_created: now,
          date_updated: now,
        })
      );
    }
    
    public save(model: CreateProps) : Promise<any> {
      return this.execute((repo) => 
        repo.save({
          ...model
        })
      )
    }

    public update(model: Partial<Props>): Promise<Props> {
      return this.execute((repo) =>
        repo.save({
          ...model,
          date_updated: new Date(),
        } as CreateProps & Props)
      );
    }

    public updateOne(id: number, props: Partial<Props>): Promise<Props> {
      return this.execute((repo) => 
        repo.save({
          id: id,
          ...props,
          date_updated: new Date()
        } as CreateProps & Props)
      )
    }

    
  
    public async delete(options: FindConditions<Class>): Promise<void> {
      await this.execute((repo) => repo.delete(options));
    }
  
    private async execute<P>(fn: (repo: Repository<Class>) => Promise<P>) {
      try {
        const repo = await this.getRepository();
        return await fn(repo);
      } catch (err) {
        if (err instanceof QueryFailedError){
        throw new PostgresError(err.message, err);
      }
      if(err instanceof Error){
      console.log(err.message)
      throw new Error("Uncaught Exception")
      }
      throw new Error("Uncaught Exception")
    } 
    }
  
    private async getRepository(): Promise<Repository<Class>> {
    //   const { DB_CONNECTION } = environment();
      const connection = await getDbConnection();
      return connection.getRepository<Class>(this.classFn);
    }
  }
  