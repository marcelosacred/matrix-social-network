export abstract class GenericRepository<T> {
    abstract create(item: T): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract findOne(id: string): Promise<T>;
    abstract update(id: string, item: Partial<T>): Promise<T>;
    abstract delete(id: string): Promise<boolean>;
  }