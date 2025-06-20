
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model TeamMembership
 * 
 */
export type TeamMembership = $Result.DefaultSelection<Prisma.$TeamMembershipPayload>
/**
 * Model Challenge
 * 
 */
export type Challenge = $Result.DefaultSelection<Prisma.$ChallengePayload>
/**
 * Model ChallengeParticipant
 * 
 */
export type ChallengeParticipant = $Result.DefaultSelection<Prisma.$ChallengeParticipantPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TeamRole: {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
};

export type TeamRole = (typeof TeamRole)[keyof typeof TeamRole]


export const ChallengeParticipantType: {
  INDIVIDUAL: 'INDIVIDUAL',
  TEAM: 'TEAM'
};

export type ChallengeParticipantType = (typeof ChallengeParticipantType)[keyof typeof ChallengeParticipantType]

}

export type TeamRole = $Enums.TeamRole

export const TeamRole: typeof $Enums.TeamRole

export type ChallengeParticipantType = $Enums.ChallengeParticipantType

export const ChallengeParticipantType: typeof $Enums.ChallengeParticipantType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamMembership`: Exposes CRUD operations for the **TeamMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMemberships
    * const teamMemberships = await prisma.teamMembership.findMany()
    * ```
    */
  get teamMembership(): Prisma.TeamMembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.challenge`: Exposes CRUD operations for the **Challenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Challenges
    * const challenges = await prisma.challenge.findMany()
    * ```
    */
  get challenge(): Prisma.ChallengeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.challengeParticipant`: Exposes CRUD operations for the **ChallengeParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChallengeParticipants
    * const challengeParticipants = await prisma.challengeParticipant.findMany()
    * ```
    */
  get challengeParticipant(): Prisma.ChallengeParticipantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Team: 'Team',
    TeamMembership: 'TeamMembership',
    Challenge: 'Challenge',
    ChallengeParticipant: 'ChallengeParticipant',
    Activity: 'Activity',
    Post: 'Post',
    Comment: 'Comment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "team" | "teamMembership" | "challenge" | "challengeParticipant" | "activity" | "post" | "comment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      TeamMembership: {
        payload: Prisma.$TeamMembershipPayload<ExtArgs>
        fields: Prisma.TeamMembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          findFirst: {
            args: Prisma.TeamMembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          findMany: {
            args: Prisma.TeamMembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>[]
          }
          create: {
            args: Prisma.TeamMembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          createMany: {
            args: Prisma.TeamMembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamMembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>[]
          }
          delete: {
            args: Prisma.TeamMembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          update: {
            args: Prisma.TeamMembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          deleteMany: {
            args: Prisma.TeamMembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamMembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>[]
          }
          upsert: {
            args: Prisma.TeamMembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMembershipPayload>
          }
          aggregate: {
            args: Prisma.TeamMembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMembership>
          }
          groupBy: {
            args: Prisma.TeamMembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMembershipCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMembershipCountAggregateOutputType> | number
          }
        }
      }
      Challenge: {
        payload: Prisma.$ChallengePayload<ExtArgs>
        fields: Prisma.ChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findFirst: {
            args: Prisma.ChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findMany: {
            args: Prisma.ChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          create: {
            args: Prisma.ChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          createMany: {
            args: Prisma.ChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          delete: {
            args: Prisma.ChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          update: {
            args: Prisma.ChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          deleteMany: {
            args: Prisma.ChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChallengeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          upsert: {
            args: Prisma.ChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          aggregate: {
            args: Prisma.ChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChallenge>
          }
          groupBy: {
            args: Prisma.ChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<ChallengeCountAggregateOutputType> | number
          }
        }
      }
      ChallengeParticipant: {
        payload: Prisma.$ChallengeParticipantPayload<ExtArgs>
        fields: Prisma.ChallengeParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChallengeParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChallengeParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>
          }
          findFirst: {
            args: Prisma.ChallengeParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChallengeParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>
          }
          findMany: {
            args: Prisma.ChallengeParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>[]
          }
          create: {
            args: Prisma.ChallengeParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>
          }
          createMany: {
            args: Prisma.ChallengeParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChallengeParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>[]
          }
          delete: {
            args: Prisma.ChallengeParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>
          }
          update: {
            args: Prisma.ChallengeParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>
          }
          deleteMany: {
            args: Prisma.ChallengeParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChallengeParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChallengeParticipantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>[]
          }
          upsert: {
            args: Prisma.ChallengeParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>
          }
          aggregate: {
            args: Prisma.ChallengeParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChallengeParticipant>
          }
          groupBy: {
            args: Prisma.ChallengeParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChallengeParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChallengeParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<ChallengeParticipantCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    team?: TeamOmit
    teamMembership?: TeamMembershipOmit
    challenge?: ChallengeOmit
    challengeParticipant?: ChallengeParticipantOmit
    activity?: ActivityOmit
    post?: PostOmit
    comment?: CommentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdTeams: number
    teamMemberships: number
    createdChallenges: number
    challengeEntries: number
    activities: number
    posts: number
    comments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdTeams?: boolean | UserCountOutputTypeCountCreatedTeamsArgs
    teamMemberships?: boolean | UserCountOutputTypeCountTeamMembershipsArgs
    createdChallenges?: boolean | UserCountOutputTypeCountCreatedChallengesArgs
    challengeEntries?: boolean | UserCountOutputTypeCountChallengeEntriesArgs
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTeamMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChallengeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeParticipantWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    teamMemberships: number
    challengeEntries: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMemberships?: boolean | TeamCountOutputTypeCountTeamMembershipsArgs
    challengeEntries?: boolean | TeamCountOutputTypeCountChallengeEntriesArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountTeamMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMembershipWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountChallengeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeParticipantWhereInput
  }


  /**
   * Count Type ChallengeCountOutputType
   */

  export type ChallengeCountOutputType = {
    participants: number
    activities: number
    posts: number
  }

  export type ChallengeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | ChallengeCountOutputTypeCountParticipantsArgs
    activities?: boolean | ChallengeCountOutputTypeCountActivitiesArgs
    posts?: boolean | ChallengeCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeCountOutputType
     */
    select?: ChallengeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeParticipantWhereInput
  }

  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type ChallengeParticipantCountOutputType
   */

  export type ChallengeParticipantCountOutputType = {
    activities: number
    posts: number
  }

  export type ChallengeParticipantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | ChallengeParticipantCountOutputTypeCountActivitiesArgs
    posts?: boolean | ChallengeParticipantCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * ChallengeParticipantCountOutputType without action
   */
  export type ChallengeParticipantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipantCountOutputType
     */
    select?: ChallengeParticipantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChallengeParticipantCountOutputType without action
   */
  export type ChallengeParticipantCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * ChallengeParticipantCountOutputType without action
   */
  export type ChallengeParticipantCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    comments: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | PostCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdTeams?: boolean | User$createdTeamsArgs<ExtArgs>
    teamMemberships?: boolean | User$teamMembershipsArgs<ExtArgs>
    createdChallenges?: boolean | User$createdChallengesArgs<ExtArgs>
    challengeEntries?: boolean | User$challengeEntriesArgs<ExtArgs>
    activities?: boolean | User$activitiesArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdTeams?: boolean | User$createdTeamsArgs<ExtArgs>
    teamMemberships?: boolean | User$teamMembershipsArgs<ExtArgs>
    createdChallenges?: boolean | User$createdChallengesArgs<ExtArgs>
    challengeEntries?: boolean | User$challengeEntriesArgs<ExtArgs>
    activities?: boolean | User$activitiesArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdTeams: Prisma.$TeamPayload<ExtArgs>[]
      teamMemberships: Prisma.$TeamMembershipPayload<ExtArgs>[]
      createdChallenges: Prisma.$ChallengePayload<ExtArgs>[]
      challengeEntries: Prisma.$ChallengeParticipantPayload<ExtArgs>[]
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdTeams<T extends User$createdTeamsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teamMemberships<T extends User$teamMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$teamMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdChallenges<T extends User$createdChallengesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdChallengesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    challengeEntries<T extends User$challengeEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$challengeEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activities<T extends User$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.createdTeams
   */
  export type User$createdTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * User.teamMemberships
   */
  export type User$teamMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    where?: TeamMembershipWhereInput
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    cursor?: TeamMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * User.createdChallenges
   */
  export type User$createdChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    cursor?: ChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * User.challengeEntries
   */
  export type User$challengeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    where?: ChallengeParticipantWhereInput
    orderBy?: ChallengeParticipantOrderByWithRelationInput | ChallengeParticipantOrderByWithRelationInput[]
    cursor?: ChallengeParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeParticipantScalarFieldEnum | ChallengeParticipantScalarFieldEnum[]
  }

  /**
   * User.activities
   */
  export type User$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    creatorId: string | null
    name: string | null
    description: string | null
    avatarUrl: string | null
    isPublic: boolean | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    creatorId: string | null
    name: string | null
    description: string | null
    avatarUrl: string | null
    isPublic: boolean | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    creatorId: number
    name: number
    description: number
    avatarUrl: number
    isPublic: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    creatorId?: true
    name?: true
    description?: true
    avatarUrl?: true
    isPublic?: true
    createdAt?: true
    expiresAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    creatorId?: true
    name?: true
    description?: true
    avatarUrl?: true
    isPublic?: true
    createdAt?: true
    expiresAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    creatorId?: true
    name?: true
    description?: true
    avatarUrl?: true
    isPublic?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    creatorId: string
    name: string
    description: string | null
    avatarUrl: string | null
    isPublic: boolean
    createdAt: Date
    expiresAt: Date | null
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    name?: boolean
    description?: boolean
    avatarUrl?: boolean
    isPublic?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    teamMemberships?: boolean | Team$teamMembershipsArgs<ExtArgs>
    challengeEntries?: boolean | Team$challengeEntriesArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    name?: boolean
    description?: boolean
    avatarUrl?: boolean
    isPublic?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    name?: boolean
    description?: boolean
    avatarUrl?: boolean
    isPublic?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    creatorId?: boolean
    name?: boolean
    description?: boolean
    avatarUrl?: boolean
    isPublic?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorId" | "name" | "description" | "avatarUrl" | "isPublic" | "createdAt" | "expiresAt", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    teamMemberships?: boolean | Team$teamMembershipsArgs<ExtArgs>
    challengeEntries?: boolean | Team$challengeEntriesArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      teamMemberships: Prisma.$TeamMembershipPayload<ExtArgs>[]
      challengeEntries: Prisma.$ChallengeParticipantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorId: string
      name: string
      description: string | null
      avatarUrl: string | null
      isPublic: boolean
      createdAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teamMemberships<T extends Team$teamMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, Team$teamMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    challengeEntries<T extends Team$challengeEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Team$challengeEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly creatorId: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly description: FieldRef<"Team", 'String'>
    readonly avatarUrl: FieldRef<"Team", 'String'>
    readonly isPublic: FieldRef<"Team", 'Boolean'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly expiresAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.teamMemberships
   */
  export type Team$teamMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    where?: TeamMembershipWhereInput
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    cursor?: TeamMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * Team.challengeEntries
   */
  export type Team$challengeEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    where?: ChallengeParticipantWhereInput
    orderBy?: ChallengeParticipantOrderByWithRelationInput | ChallengeParticipantOrderByWithRelationInput[]
    cursor?: ChallengeParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeParticipantScalarFieldEnum | ChallengeParticipantScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model TeamMembership
   */

  export type AggregateTeamMembership = {
    _count: TeamMembershipCountAggregateOutputType | null
    _min: TeamMembershipMinAggregateOutputType | null
    _max: TeamMembershipMaxAggregateOutputType | null
  }

  export type TeamMembershipMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    role: $Enums.TeamRole | null
    joinedAt: Date | null
    expiresAt: Date | null
  }

  export type TeamMembershipMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    role: $Enums.TeamRole | null
    joinedAt: Date | null
    expiresAt: Date | null
  }

  export type TeamMembershipCountAggregateOutputType = {
    id: number
    teamId: number
    userId: number
    role: number
    joinedAt: number
    expiresAt: number
    _all: number
  }


  export type TeamMembershipMinAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
    expiresAt?: true
  }

  export type TeamMembershipMaxAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
    expiresAt?: true
  }

  export type TeamMembershipCountAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    role?: true
    joinedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type TeamMembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembership to aggregate.
     */
    where?: TeamMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberships to fetch.
     */
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMemberships
    **/
    _count?: true | TeamMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMembershipMaxAggregateInputType
  }

  export type GetTeamMembershipAggregateType<T extends TeamMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMembership[P]>
      : GetScalarType<T[P], AggregateTeamMembership[P]>
  }




  export type TeamMembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMembershipWhereInput
    orderBy?: TeamMembershipOrderByWithAggregationInput | TeamMembershipOrderByWithAggregationInput[]
    by: TeamMembershipScalarFieldEnum[] | TeamMembershipScalarFieldEnum
    having?: TeamMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMembershipCountAggregateInputType | true
    _min?: TeamMembershipMinAggregateInputType
    _max?: TeamMembershipMaxAggregateInputType
  }

  export type TeamMembershipGroupByOutputType = {
    id: string
    teamId: string
    userId: string
    role: $Enums.TeamRole
    joinedAt: Date
    expiresAt: Date | null
    _count: TeamMembershipCountAggregateOutputType | null
    _min: TeamMembershipMinAggregateOutputType | null
    _max: TeamMembershipMaxAggregateOutputType | null
  }

  type GetTeamMembershipGroupByPayload<T extends TeamMembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMembershipGroupByOutputType[P]>
        }
      >
    >


  export type TeamMembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    expiresAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMembership"]>

  export type TeamMembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    expiresAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMembership"]>

  export type TeamMembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    expiresAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMembership"]>

  export type TeamMembershipSelectScalar = {
    id?: boolean
    teamId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    expiresAt?: boolean
  }

  export type TeamMembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "userId" | "role" | "joinedAt" | "expiresAt", ExtArgs["result"]["teamMembership"]>
  export type TeamMembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TeamMembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TeamMembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TeamMembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMembership"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      userId: string
      role: $Enums.TeamRole
      joinedAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["teamMembership"]>
    composites: {}
  }

  type TeamMembershipGetPayload<S extends boolean | null | undefined | TeamMembershipDefaultArgs> = $Result.GetResult<Prisma.$TeamMembershipPayload, S>

  type TeamMembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamMembershipCountAggregateInputType | true
    }

  export interface TeamMembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMembership'], meta: { name: 'TeamMembership' } }
    /**
     * Find zero or one TeamMembership that matches the filter.
     * @param {TeamMembershipFindUniqueArgs} args - Arguments to find a TeamMembership
     * @example
     * // Get one TeamMembership
     * const teamMembership = await prisma.teamMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMembershipFindUniqueArgs>(args: SelectSubset<T, TeamMembershipFindUniqueArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamMembership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamMembershipFindUniqueOrThrowArgs} args - Arguments to find a TeamMembership
     * @example
     * // Get one TeamMembership
     * const teamMembership = await prisma.teamMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipFindFirstArgs} args - Arguments to find a TeamMembership
     * @example
     * // Get one TeamMembership
     * const teamMembership = await prisma.teamMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMembershipFindFirstArgs>(args?: SelectSubset<T, TeamMembershipFindFirstArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMembership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipFindFirstOrThrowArgs} args - Arguments to find a TeamMembership
     * @example
     * // Get one TeamMembership
     * const teamMembership = await prisma.teamMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMemberships
     * const teamMemberships = await prisma.teamMembership.findMany()
     * 
     * // Get first 10 TeamMemberships
     * const teamMemberships = await prisma.teamMembership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMembershipWithIdOnly = await prisma.teamMembership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMembershipFindManyArgs>(args?: SelectSubset<T, TeamMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamMembership.
     * @param {TeamMembershipCreateArgs} args - Arguments to create a TeamMembership.
     * @example
     * // Create one TeamMembership
     * const TeamMembership = await prisma.teamMembership.create({
     *   data: {
     *     // ... data to create a TeamMembership
     *   }
     * })
     * 
     */
    create<T extends TeamMembershipCreateArgs>(args: SelectSubset<T, TeamMembershipCreateArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamMemberships.
     * @param {TeamMembershipCreateManyArgs} args - Arguments to create many TeamMemberships.
     * @example
     * // Create many TeamMemberships
     * const teamMembership = await prisma.teamMembership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMembershipCreateManyArgs>(args?: SelectSubset<T, TeamMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeamMemberships and returns the data saved in the database.
     * @param {TeamMembershipCreateManyAndReturnArgs} args - Arguments to create many TeamMemberships.
     * @example
     * // Create many TeamMemberships
     * const teamMembership = await prisma.teamMembership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeamMemberships and only return the `id`
     * const teamMembershipWithIdOnly = await prisma.teamMembership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamMembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamMembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TeamMembership.
     * @param {TeamMembershipDeleteArgs} args - Arguments to delete one TeamMembership.
     * @example
     * // Delete one TeamMembership
     * const TeamMembership = await prisma.teamMembership.delete({
     *   where: {
     *     // ... filter to delete one TeamMembership
     *   }
     * })
     * 
     */
    delete<T extends TeamMembershipDeleteArgs>(args: SelectSubset<T, TeamMembershipDeleteArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamMembership.
     * @param {TeamMembershipUpdateArgs} args - Arguments to update one TeamMembership.
     * @example
     * // Update one TeamMembership
     * const teamMembership = await prisma.teamMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMembershipUpdateArgs>(args: SelectSubset<T, TeamMembershipUpdateArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamMemberships.
     * @param {TeamMembershipDeleteManyArgs} args - Arguments to filter TeamMemberships to delete.
     * @example
     * // Delete a few TeamMemberships
     * const { count } = await prisma.teamMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMembershipDeleteManyArgs>(args?: SelectSubset<T, TeamMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMemberships
     * const teamMembership = await prisma.teamMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMembershipUpdateManyArgs>(args: SelectSubset<T, TeamMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMemberships and returns the data updated in the database.
     * @param {TeamMembershipUpdateManyAndReturnArgs} args - Arguments to update many TeamMemberships.
     * @example
     * // Update many TeamMemberships
     * const teamMembership = await prisma.teamMembership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TeamMemberships and only return the `id`
     * const teamMembershipWithIdOnly = await prisma.teamMembership.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamMembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamMembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TeamMembership.
     * @param {TeamMembershipUpsertArgs} args - Arguments to update or create a TeamMembership.
     * @example
     * // Update or create a TeamMembership
     * const teamMembership = await prisma.teamMembership.upsert({
     *   create: {
     *     // ... data to create a TeamMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMembership we want to update
     *   }
     * })
     */
    upsert<T extends TeamMembershipUpsertArgs>(args: SelectSubset<T, TeamMembershipUpsertArgs<ExtArgs>>): Prisma__TeamMembershipClient<$Result.GetResult<Prisma.$TeamMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipCountArgs} args - Arguments to filter TeamMemberships to count.
     * @example
     * // Count the number of TeamMemberships
     * const count = await prisma.teamMembership.count({
     *   where: {
     *     // ... the filter for the TeamMemberships we want to count
     *   }
     * })
    **/
    count<T extends TeamMembershipCountArgs>(
      args?: Subset<T, TeamMembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMembershipAggregateArgs>(args: Subset<T, TeamMembershipAggregateArgs>): Prisma.PrismaPromise<GetTeamMembershipAggregateType<T>>

    /**
     * Group by TeamMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMembershipGroupByArgs['orderBy'] }
        : { orderBy?: TeamMembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMembership model
   */
  readonly fields: TeamMembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMembership model
   */
  interface TeamMembershipFieldRefs {
    readonly id: FieldRef<"TeamMembership", 'String'>
    readonly teamId: FieldRef<"TeamMembership", 'String'>
    readonly userId: FieldRef<"TeamMembership", 'String'>
    readonly role: FieldRef<"TeamMembership", 'TeamRole'>
    readonly joinedAt: FieldRef<"TeamMembership", 'DateTime'>
    readonly expiresAt: FieldRef<"TeamMembership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMembership findUnique
   */
  export type TeamMembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembership to fetch.
     */
    where: TeamMembershipWhereUniqueInput
  }

  /**
   * TeamMembership findUniqueOrThrow
   */
  export type TeamMembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembership to fetch.
     */
    where: TeamMembershipWhereUniqueInput
  }

  /**
   * TeamMembership findFirst
   */
  export type TeamMembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembership to fetch.
     */
    where?: TeamMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberships to fetch.
     */
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMemberships.
     */
    cursor?: TeamMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMemberships.
     */
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * TeamMembership findFirstOrThrow
   */
  export type TeamMembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembership to fetch.
     */
    where?: TeamMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberships to fetch.
     */
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMemberships.
     */
    cursor?: TeamMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMemberships.
     */
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * TeamMembership findMany
   */
  export type TeamMembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter, which TeamMemberships to fetch.
     */
    where?: TeamMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberships to fetch.
     */
    orderBy?: TeamMembershipOrderByWithRelationInput | TeamMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMemberships.
     */
    cursor?: TeamMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberships.
     */
    skip?: number
    distinct?: TeamMembershipScalarFieldEnum | TeamMembershipScalarFieldEnum[]
  }

  /**
   * TeamMembership create
   */
  export type TeamMembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMembership.
     */
    data: XOR<TeamMembershipCreateInput, TeamMembershipUncheckedCreateInput>
  }

  /**
   * TeamMembership createMany
   */
  export type TeamMembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMemberships.
     */
    data: TeamMembershipCreateManyInput | TeamMembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMembership createManyAndReturn
   */
  export type TeamMembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * The data used to create many TeamMemberships.
     */
    data: TeamMembershipCreateManyInput | TeamMembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMembership update
   */
  export type TeamMembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMembership.
     */
    data: XOR<TeamMembershipUpdateInput, TeamMembershipUncheckedUpdateInput>
    /**
     * Choose, which TeamMembership to update.
     */
    where: TeamMembershipWhereUniqueInput
  }

  /**
   * TeamMembership updateMany
   */
  export type TeamMembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMemberships.
     */
    data: XOR<TeamMembershipUpdateManyMutationInput, TeamMembershipUncheckedUpdateManyInput>
    /**
     * Filter which TeamMemberships to update
     */
    where?: TeamMembershipWhereInput
    /**
     * Limit how many TeamMemberships to update.
     */
    limit?: number
  }

  /**
   * TeamMembership updateManyAndReturn
   */
  export type TeamMembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * The data used to update TeamMemberships.
     */
    data: XOR<TeamMembershipUpdateManyMutationInput, TeamMembershipUncheckedUpdateManyInput>
    /**
     * Filter which TeamMemberships to update
     */
    where?: TeamMembershipWhereInput
    /**
     * Limit how many TeamMemberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMembership upsert
   */
  export type TeamMembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMembership to update in case it exists.
     */
    where: TeamMembershipWhereUniqueInput
    /**
     * In case the TeamMembership found by the `where` argument doesn't exist, create a new TeamMembership with this data.
     */
    create: XOR<TeamMembershipCreateInput, TeamMembershipUncheckedCreateInput>
    /**
     * In case the TeamMembership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMembershipUpdateInput, TeamMembershipUncheckedUpdateInput>
  }

  /**
   * TeamMembership delete
   */
  export type TeamMembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
    /**
     * Filter which TeamMembership to delete.
     */
    where: TeamMembershipWhereUniqueInput
  }

  /**
   * TeamMembership deleteMany
   */
  export type TeamMembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMemberships to delete
     */
    where?: TeamMembershipWhereInput
    /**
     * Limit how many TeamMemberships to delete.
     */
    limit?: number
  }

  /**
   * TeamMembership without action
   */
  export type TeamMembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMembership
     */
    select?: TeamMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMembership
     */
    omit?: TeamMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMembershipInclude<ExtArgs> | null
  }


  /**
   * Model Challenge
   */

  export type AggregateChallenge = {
    _count: ChallengeCountAggregateOutputType | null
    _avg: ChallengeAvgAggregateOutputType | null
    _sum: ChallengeSumAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  export type ChallengeAvgAggregateOutputType = {
    maxParticipants: number | null
  }

  export type ChallengeSumAggregateOutputType = {
    maxParticipants: number | null
  }

  export type ChallengeMinAggregateOutputType = {
    id: string | null
    creatorId: string | null
    title: string | null
    description: string | null
    challengeType: $Enums.ChallengeParticipantType | null
    maxParticipants: number | null
    startDate: Date | null
    endDate: Date | null
    isPublic: boolean | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type ChallengeMaxAggregateOutputType = {
    id: string | null
    creatorId: string | null
    title: string | null
    description: string | null
    challengeType: $Enums.ChallengeParticipantType | null
    maxParticipants: number | null
    startDate: Date | null
    endDate: Date | null
    isPublic: boolean | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type ChallengeCountAggregateOutputType = {
    id: number
    creatorId: number
    title: number
    description: number
    challengeType: number
    maxParticipants: number
    startDate: number
    endDate: number
    isPublic: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type ChallengeAvgAggregateInputType = {
    maxParticipants?: true
  }

  export type ChallengeSumAggregateInputType = {
    maxParticipants?: true
  }

  export type ChallengeMinAggregateInputType = {
    id?: true
    creatorId?: true
    title?: true
    description?: true
    challengeType?: true
    maxParticipants?: true
    startDate?: true
    endDate?: true
    isPublic?: true
    createdAt?: true
    expiresAt?: true
  }

  export type ChallengeMaxAggregateInputType = {
    id?: true
    creatorId?: true
    title?: true
    description?: true
    challengeType?: true
    maxParticipants?: true
    startDate?: true
    endDate?: true
    isPublic?: true
    createdAt?: true
    expiresAt?: true
  }

  export type ChallengeCountAggregateInputType = {
    id?: true
    creatorId?: true
    title?: true
    description?: true
    challengeType?: true
    maxParticipants?: true
    startDate?: true
    endDate?: true
    isPublic?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type ChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenge to aggregate.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Challenges
    **/
    _count?: true | ChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChallengeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChallengeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeMaxAggregateInputType
  }

  export type GetChallengeAggregateType<T extends ChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChallenge[P]>
      : GetScalarType<T[P], AggregateChallenge[P]>
  }




  export type ChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithAggregationInput | ChallengeOrderByWithAggregationInput[]
    by: ChallengeScalarFieldEnum[] | ChallengeScalarFieldEnum
    having?: ChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChallengeCountAggregateInputType | true
    _avg?: ChallengeAvgAggregateInputType
    _sum?: ChallengeSumAggregateInputType
    _min?: ChallengeMinAggregateInputType
    _max?: ChallengeMaxAggregateInputType
  }

  export type ChallengeGroupByOutputType = {
    id: string
    creatorId: string
    title: string
    description: string | null
    challengeType: $Enums.ChallengeParticipantType
    maxParticipants: number | null
    startDate: Date
    endDate: Date
    isPublic: boolean
    createdAt: Date
    expiresAt: Date | null
    _count: ChallengeCountAggregateOutputType | null
    _avg: ChallengeAvgAggregateOutputType | null
    _sum: ChallengeSumAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  type GetChallengeGroupByPayload<T extends ChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
        }
      >
    >


  export type ChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    title?: boolean
    description?: boolean
    challengeType?: boolean
    maxParticipants?: boolean
    startDate?: boolean
    endDate?: boolean
    isPublic?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    participants?: boolean | Challenge$participantsArgs<ExtArgs>
    activities?: boolean | Challenge$activitiesArgs<ExtArgs>
    posts?: boolean | Challenge$postsArgs<ExtArgs>
    _count?: boolean | ChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    title?: boolean
    description?: boolean
    challengeType?: boolean
    maxParticipants?: boolean
    startDate?: boolean
    endDate?: boolean
    isPublic?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorId?: boolean
    title?: boolean
    description?: boolean
    challengeType?: boolean
    maxParticipants?: boolean
    startDate?: boolean
    endDate?: boolean
    isPublic?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectScalar = {
    id?: boolean
    creatorId?: boolean
    title?: boolean
    description?: boolean
    challengeType?: boolean
    maxParticipants?: boolean
    startDate?: boolean
    endDate?: boolean
    isPublic?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type ChallengeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorId" | "title" | "description" | "challengeType" | "maxParticipants" | "startDate" | "endDate" | "isPublic" | "createdAt" | "expiresAt", ExtArgs["result"]["challenge"]>
  export type ChallengeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    participants?: boolean | Challenge$participantsArgs<ExtArgs>
    activities?: boolean | Challenge$activitiesArgs<ExtArgs>
    posts?: boolean | Challenge$postsArgs<ExtArgs>
    _count?: boolean | ChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChallengeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ChallengeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Challenge"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      participants: Prisma.$ChallengeParticipantPayload<ExtArgs>[]
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorId: string
      title: string
      description: string | null
      challengeType: $Enums.ChallengeParticipantType
      maxParticipants: number | null
      startDate: Date
      endDate: Date
      isPublic: boolean
      createdAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["challenge"]>
    composites: {}
  }

  type ChallengeGetPayload<S extends boolean | null | undefined | ChallengeDefaultArgs> = $Result.GetResult<Prisma.$ChallengePayload, S>

  type ChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChallengeCountAggregateInputType | true
    }

  export interface ChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Challenge'], meta: { name: 'Challenge' } }
    /**
     * Find zero or one Challenge that matches the filter.
     * @param {ChallengeFindUniqueArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChallengeFindUniqueArgs>(args: SelectSubset<T, ChallengeFindUniqueArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Challenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChallengeFindUniqueOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, ChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Challenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChallengeFindFirstArgs>(args?: SelectSubset<T, ChallengeFindFirstArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Challenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, ChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Challenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Challenges
     * const challenges = await prisma.challenge.findMany()
     * 
     * // Get first 10 Challenges
     * const challenges = await prisma.challenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const challengeWithIdOnly = await prisma.challenge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChallengeFindManyArgs>(args?: SelectSubset<T, ChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Challenge.
     * @param {ChallengeCreateArgs} args - Arguments to create a Challenge.
     * @example
     * // Create one Challenge
     * const Challenge = await prisma.challenge.create({
     *   data: {
     *     // ... data to create a Challenge
     *   }
     * })
     * 
     */
    create<T extends ChallengeCreateArgs>(args: SelectSubset<T, ChallengeCreateArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Challenges.
     * @param {ChallengeCreateManyArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChallengeCreateManyArgs>(args?: SelectSubset<T, ChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Challenges and returns the data saved in the database.
     * @param {ChallengeCreateManyAndReturnArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Challenges and only return the `id`
     * const challengeWithIdOnly = await prisma.challenge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, ChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Challenge.
     * @param {ChallengeDeleteArgs} args - Arguments to delete one Challenge.
     * @example
     * // Delete one Challenge
     * const Challenge = await prisma.challenge.delete({
     *   where: {
     *     // ... filter to delete one Challenge
     *   }
     * })
     * 
     */
    delete<T extends ChallengeDeleteArgs>(args: SelectSubset<T, ChallengeDeleteArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Challenge.
     * @param {ChallengeUpdateArgs} args - Arguments to update one Challenge.
     * @example
     * // Update one Challenge
     * const challenge = await prisma.challenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChallengeUpdateArgs>(args: SelectSubset<T, ChallengeUpdateArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Challenges.
     * @param {ChallengeDeleteManyArgs} args - Arguments to filter Challenges to delete.
     * @example
     * // Delete a few Challenges
     * const { count } = await prisma.challenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChallengeDeleteManyArgs>(args?: SelectSubset<T, ChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChallengeUpdateManyArgs>(args: SelectSubset<T, ChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges and returns the data updated in the database.
     * @param {ChallengeUpdateManyAndReturnArgs} args - Arguments to update many Challenges.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Challenges and only return the `id`
     * const challengeWithIdOnly = await prisma.challenge.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChallengeUpdateManyAndReturnArgs>(args: SelectSubset<T, ChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Challenge.
     * @param {ChallengeUpsertArgs} args - Arguments to update or create a Challenge.
     * @example
     * // Update or create a Challenge
     * const challenge = await prisma.challenge.upsert({
     *   create: {
     *     // ... data to create a Challenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Challenge we want to update
     *   }
     * })
     */
    upsert<T extends ChallengeUpsertArgs>(args: SelectSubset<T, ChallengeUpsertArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeCountArgs} args - Arguments to filter Challenges to count.
     * @example
     * // Count the number of Challenges
     * const count = await prisma.challenge.count({
     *   where: {
     *     // ... the filter for the Challenges we want to count
     *   }
     * })
    **/
    count<T extends ChallengeCountArgs>(
      args?: Subset<T, ChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChallengeAggregateArgs>(args: Subset<T, ChallengeAggregateArgs>): Prisma.PrismaPromise<GetChallengeAggregateType<T>>

    /**
     * Group by Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChallengeGroupByArgs['orderBy'] }
        : { orderBy?: ChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Challenge model
   */
  readonly fields: ChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Challenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participants<T extends Challenge$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Challenge$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activities<T extends Challenge$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Challenge$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends Challenge$postsArgs<ExtArgs> = {}>(args?: Subset<T, Challenge$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Challenge model
   */
  interface ChallengeFieldRefs {
    readonly id: FieldRef<"Challenge", 'String'>
    readonly creatorId: FieldRef<"Challenge", 'String'>
    readonly title: FieldRef<"Challenge", 'String'>
    readonly description: FieldRef<"Challenge", 'String'>
    readonly challengeType: FieldRef<"Challenge", 'ChallengeParticipantType'>
    readonly maxParticipants: FieldRef<"Challenge", 'Int'>
    readonly startDate: FieldRef<"Challenge", 'DateTime'>
    readonly endDate: FieldRef<"Challenge", 'DateTime'>
    readonly isPublic: FieldRef<"Challenge", 'Boolean'>
    readonly createdAt: FieldRef<"Challenge", 'DateTime'>
    readonly expiresAt: FieldRef<"Challenge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Challenge findUnique
   */
  export type ChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findUniqueOrThrow
   */
  export type ChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findFirst
   */
  export type ChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findFirstOrThrow
   */
  export type ChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findMany
   */
  export type ChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenges to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge create
   */
  export type ChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The data needed to create a Challenge.
     */
    data: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
  }

  /**
   * Challenge createMany
   */
  export type ChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Challenge createManyAndReturn
   */
  export type ChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Challenge update
   */
  export type ChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The data needed to update a Challenge.
     */
    data: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
    /**
     * Choose, which Challenge to update.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge updateMany
   */
  export type ChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to update.
     */
    limit?: number
  }

  /**
   * Challenge updateManyAndReturn
   */
  export type ChallengeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Challenge upsert
   */
  export type ChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The filter to search for the Challenge to update in case it exists.
     */
    where: ChallengeWhereUniqueInput
    /**
     * In case the Challenge found by the `where` argument doesn't exist, create a new Challenge with this data.
     */
    create: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
    /**
     * In case the Challenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
  }

  /**
   * Challenge delete
   */
  export type ChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter which Challenge to delete.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge deleteMany
   */
  export type ChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenges to delete
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to delete.
     */
    limit?: number
  }

  /**
   * Challenge.participants
   */
  export type Challenge$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    where?: ChallengeParticipantWhereInput
    orderBy?: ChallengeParticipantOrderByWithRelationInput | ChallengeParticipantOrderByWithRelationInput[]
    cursor?: ChallengeParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeParticipantScalarFieldEnum | ChallengeParticipantScalarFieldEnum[]
  }

  /**
   * Challenge.activities
   */
  export type Challenge$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Challenge.posts
   */
  export type Challenge$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Challenge without action
   */
  export type ChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
  }


  /**
   * Model ChallengeParticipant
   */

  export type AggregateChallengeParticipant = {
    _count: ChallengeParticipantCountAggregateOutputType | null
    _min: ChallengeParticipantMinAggregateOutputType | null
    _max: ChallengeParticipantMaxAggregateOutputType | null
  }

  export type ChallengeParticipantMinAggregateOutputType = {
    id: string | null
    challengeId: string | null
    userId: string | null
    teamId: string | null
    joinedAt: Date | null
  }

  export type ChallengeParticipantMaxAggregateOutputType = {
    id: string | null
    challengeId: string | null
    userId: string | null
    teamId: string | null
    joinedAt: Date | null
  }

  export type ChallengeParticipantCountAggregateOutputType = {
    id: number
    challengeId: number
    userId: number
    teamId: number
    joinedAt: number
    _all: number
  }


  export type ChallengeParticipantMinAggregateInputType = {
    id?: true
    challengeId?: true
    userId?: true
    teamId?: true
    joinedAt?: true
  }

  export type ChallengeParticipantMaxAggregateInputType = {
    id?: true
    challengeId?: true
    userId?: true
    teamId?: true
    joinedAt?: true
  }

  export type ChallengeParticipantCountAggregateInputType = {
    id?: true
    challengeId?: true
    userId?: true
    teamId?: true
    joinedAt?: true
    _all?: true
  }

  export type ChallengeParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChallengeParticipant to aggregate.
     */
    where?: ChallengeParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeParticipants to fetch.
     */
    orderBy?: ChallengeParticipantOrderByWithRelationInput | ChallengeParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChallengeParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChallengeParticipants
    **/
    _count?: true | ChallengeParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeParticipantMaxAggregateInputType
  }

  export type GetChallengeParticipantAggregateType<T extends ChallengeParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateChallengeParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChallengeParticipant[P]>
      : GetScalarType<T[P], AggregateChallengeParticipant[P]>
  }




  export type ChallengeParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeParticipantWhereInput
    orderBy?: ChallengeParticipantOrderByWithAggregationInput | ChallengeParticipantOrderByWithAggregationInput[]
    by: ChallengeParticipantScalarFieldEnum[] | ChallengeParticipantScalarFieldEnum
    having?: ChallengeParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChallengeParticipantCountAggregateInputType | true
    _min?: ChallengeParticipantMinAggregateInputType
    _max?: ChallengeParticipantMaxAggregateInputType
  }

  export type ChallengeParticipantGroupByOutputType = {
    id: string
    challengeId: string
    userId: string | null
    teamId: string | null
    joinedAt: Date
    _count: ChallengeParticipantCountAggregateOutputType | null
    _min: ChallengeParticipantMinAggregateOutputType | null
    _max: ChallengeParticipantMaxAggregateOutputType | null
  }

  type GetChallengeParticipantGroupByPayload<T extends ChallengeParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChallengeParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChallengeParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChallengeParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], ChallengeParticipantGroupByOutputType[P]>
        }
      >
    >


  export type ChallengeParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challengeId?: boolean
    userId?: boolean
    teamId?: boolean
    joinedAt?: boolean
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | ChallengeParticipant$userArgs<ExtArgs>
    team?: boolean | ChallengeParticipant$teamArgs<ExtArgs>
    activities?: boolean | ChallengeParticipant$activitiesArgs<ExtArgs>
    posts?: boolean | ChallengeParticipant$postsArgs<ExtArgs>
    _count?: boolean | ChallengeParticipantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challengeParticipant"]>

  export type ChallengeParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challengeId?: boolean
    userId?: boolean
    teamId?: boolean
    joinedAt?: boolean
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | ChallengeParticipant$userArgs<ExtArgs>
    team?: boolean | ChallengeParticipant$teamArgs<ExtArgs>
  }, ExtArgs["result"]["challengeParticipant"]>

  export type ChallengeParticipantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challengeId?: boolean
    userId?: boolean
    teamId?: boolean
    joinedAt?: boolean
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | ChallengeParticipant$userArgs<ExtArgs>
    team?: boolean | ChallengeParticipant$teamArgs<ExtArgs>
  }, ExtArgs["result"]["challengeParticipant"]>

  export type ChallengeParticipantSelectScalar = {
    id?: boolean
    challengeId?: boolean
    userId?: boolean
    teamId?: boolean
    joinedAt?: boolean
  }

  export type ChallengeParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "challengeId" | "userId" | "teamId" | "joinedAt", ExtArgs["result"]["challengeParticipant"]>
  export type ChallengeParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | ChallengeParticipant$userArgs<ExtArgs>
    team?: boolean | ChallengeParticipant$teamArgs<ExtArgs>
    activities?: boolean | ChallengeParticipant$activitiesArgs<ExtArgs>
    posts?: boolean | ChallengeParticipant$postsArgs<ExtArgs>
    _count?: boolean | ChallengeParticipantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChallengeParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | ChallengeParticipant$userArgs<ExtArgs>
    team?: boolean | ChallengeParticipant$teamArgs<ExtArgs>
  }
  export type ChallengeParticipantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | ChallengeParticipant$userArgs<ExtArgs>
    team?: boolean | ChallengeParticipant$teamArgs<ExtArgs>
  }

  export type $ChallengeParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChallengeParticipant"
    objects: {
      challenge: Prisma.$ChallengePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      team: Prisma.$TeamPayload<ExtArgs> | null
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      challengeId: string
      userId: string | null
      teamId: string | null
      joinedAt: Date
    }, ExtArgs["result"]["challengeParticipant"]>
    composites: {}
  }

  type ChallengeParticipantGetPayload<S extends boolean | null | undefined | ChallengeParticipantDefaultArgs> = $Result.GetResult<Prisma.$ChallengeParticipantPayload, S>

  type ChallengeParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChallengeParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChallengeParticipantCountAggregateInputType | true
    }

  export interface ChallengeParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChallengeParticipant'], meta: { name: 'ChallengeParticipant' } }
    /**
     * Find zero or one ChallengeParticipant that matches the filter.
     * @param {ChallengeParticipantFindUniqueArgs} args - Arguments to find a ChallengeParticipant
     * @example
     * // Get one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChallengeParticipantFindUniqueArgs>(args: SelectSubset<T, ChallengeParticipantFindUniqueArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChallengeParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChallengeParticipantFindUniqueOrThrowArgs} args - Arguments to find a ChallengeParticipant
     * @example
     * // Get one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChallengeParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, ChallengeParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChallengeParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantFindFirstArgs} args - Arguments to find a ChallengeParticipant
     * @example
     * // Get one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChallengeParticipantFindFirstArgs>(args?: SelectSubset<T, ChallengeParticipantFindFirstArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChallengeParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantFindFirstOrThrowArgs} args - Arguments to find a ChallengeParticipant
     * @example
     * // Get one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChallengeParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, ChallengeParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChallengeParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChallengeParticipants
     * const challengeParticipants = await prisma.challengeParticipant.findMany()
     * 
     * // Get first 10 ChallengeParticipants
     * const challengeParticipants = await prisma.challengeParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const challengeParticipantWithIdOnly = await prisma.challengeParticipant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChallengeParticipantFindManyArgs>(args?: SelectSubset<T, ChallengeParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChallengeParticipant.
     * @param {ChallengeParticipantCreateArgs} args - Arguments to create a ChallengeParticipant.
     * @example
     * // Create one ChallengeParticipant
     * const ChallengeParticipant = await prisma.challengeParticipant.create({
     *   data: {
     *     // ... data to create a ChallengeParticipant
     *   }
     * })
     * 
     */
    create<T extends ChallengeParticipantCreateArgs>(args: SelectSubset<T, ChallengeParticipantCreateArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChallengeParticipants.
     * @param {ChallengeParticipantCreateManyArgs} args - Arguments to create many ChallengeParticipants.
     * @example
     * // Create many ChallengeParticipants
     * const challengeParticipant = await prisma.challengeParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChallengeParticipantCreateManyArgs>(args?: SelectSubset<T, ChallengeParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChallengeParticipants and returns the data saved in the database.
     * @param {ChallengeParticipantCreateManyAndReturnArgs} args - Arguments to create many ChallengeParticipants.
     * @example
     * // Create many ChallengeParticipants
     * const challengeParticipant = await prisma.challengeParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChallengeParticipants and only return the `id`
     * const challengeParticipantWithIdOnly = await prisma.challengeParticipant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChallengeParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, ChallengeParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChallengeParticipant.
     * @param {ChallengeParticipantDeleteArgs} args - Arguments to delete one ChallengeParticipant.
     * @example
     * // Delete one ChallengeParticipant
     * const ChallengeParticipant = await prisma.challengeParticipant.delete({
     *   where: {
     *     // ... filter to delete one ChallengeParticipant
     *   }
     * })
     * 
     */
    delete<T extends ChallengeParticipantDeleteArgs>(args: SelectSubset<T, ChallengeParticipantDeleteArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChallengeParticipant.
     * @param {ChallengeParticipantUpdateArgs} args - Arguments to update one ChallengeParticipant.
     * @example
     * // Update one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChallengeParticipantUpdateArgs>(args: SelectSubset<T, ChallengeParticipantUpdateArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChallengeParticipants.
     * @param {ChallengeParticipantDeleteManyArgs} args - Arguments to filter ChallengeParticipants to delete.
     * @example
     * // Delete a few ChallengeParticipants
     * const { count } = await prisma.challengeParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChallengeParticipantDeleteManyArgs>(args?: SelectSubset<T, ChallengeParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChallengeParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChallengeParticipants
     * const challengeParticipant = await prisma.challengeParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChallengeParticipantUpdateManyArgs>(args: SelectSubset<T, ChallengeParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChallengeParticipants and returns the data updated in the database.
     * @param {ChallengeParticipantUpdateManyAndReturnArgs} args - Arguments to update many ChallengeParticipants.
     * @example
     * // Update many ChallengeParticipants
     * const challengeParticipant = await prisma.challengeParticipant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChallengeParticipants and only return the `id`
     * const challengeParticipantWithIdOnly = await prisma.challengeParticipant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChallengeParticipantUpdateManyAndReturnArgs>(args: SelectSubset<T, ChallengeParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChallengeParticipant.
     * @param {ChallengeParticipantUpsertArgs} args - Arguments to update or create a ChallengeParticipant.
     * @example
     * // Update or create a ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.upsert({
     *   create: {
     *     // ... data to create a ChallengeParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChallengeParticipant we want to update
     *   }
     * })
     */
    upsert<T extends ChallengeParticipantUpsertArgs>(args: SelectSubset<T, ChallengeParticipantUpsertArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChallengeParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantCountArgs} args - Arguments to filter ChallengeParticipants to count.
     * @example
     * // Count the number of ChallengeParticipants
     * const count = await prisma.challengeParticipant.count({
     *   where: {
     *     // ... the filter for the ChallengeParticipants we want to count
     *   }
     * })
    **/
    count<T extends ChallengeParticipantCountArgs>(
      args?: Subset<T, ChallengeParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChallengeParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChallengeParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChallengeParticipantAggregateArgs>(args: Subset<T, ChallengeParticipantAggregateArgs>): Prisma.PrismaPromise<GetChallengeParticipantAggregateType<T>>

    /**
     * Group by ChallengeParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChallengeParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChallengeParticipantGroupByArgs['orderBy'] }
        : { orderBy?: ChallengeParticipantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChallengeParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChallengeParticipant model
   */
  readonly fields: ChallengeParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChallengeParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChallengeParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    challenge<T extends ChallengeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeDefaultArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends ChallengeParticipant$userArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeParticipant$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    team<T extends ChallengeParticipant$teamArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeParticipant$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    activities<T extends ChallengeParticipant$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeParticipant$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends ChallengeParticipant$postsArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeParticipant$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChallengeParticipant model
   */
  interface ChallengeParticipantFieldRefs {
    readonly id: FieldRef<"ChallengeParticipant", 'String'>
    readonly challengeId: FieldRef<"ChallengeParticipant", 'String'>
    readonly userId: FieldRef<"ChallengeParticipant", 'String'>
    readonly teamId: FieldRef<"ChallengeParticipant", 'String'>
    readonly joinedAt: FieldRef<"ChallengeParticipant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChallengeParticipant findUnique
   */
  export type ChallengeParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeParticipant to fetch.
     */
    where: ChallengeParticipantWhereUniqueInput
  }

  /**
   * ChallengeParticipant findUniqueOrThrow
   */
  export type ChallengeParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeParticipant to fetch.
     */
    where: ChallengeParticipantWhereUniqueInput
  }

  /**
   * ChallengeParticipant findFirst
   */
  export type ChallengeParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeParticipant to fetch.
     */
    where?: ChallengeParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeParticipants to fetch.
     */
    orderBy?: ChallengeParticipantOrderByWithRelationInput | ChallengeParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChallengeParticipants.
     */
    cursor?: ChallengeParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChallengeParticipants.
     */
    distinct?: ChallengeParticipantScalarFieldEnum | ChallengeParticipantScalarFieldEnum[]
  }

  /**
   * ChallengeParticipant findFirstOrThrow
   */
  export type ChallengeParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeParticipant to fetch.
     */
    where?: ChallengeParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeParticipants to fetch.
     */
    orderBy?: ChallengeParticipantOrderByWithRelationInput | ChallengeParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChallengeParticipants.
     */
    cursor?: ChallengeParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChallengeParticipants.
     */
    distinct?: ChallengeParticipantScalarFieldEnum | ChallengeParticipantScalarFieldEnum[]
  }

  /**
   * ChallengeParticipant findMany
   */
  export type ChallengeParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeParticipants to fetch.
     */
    where?: ChallengeParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeParticipants to fetch.
     */
    orderBy?: ChallengeParticipantOrderByWithRelationInput | ChallengeParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChallengeParticipants.
     */
    cursor?: ChallengeParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeParticipants.
     */
    skip?: number
    distinct?: ChallengeParticipantScalarFieldEnum | ChallengeParticipantScalarFieldEnum[]
  }

  /**
   * ChallengeParticipant create
   */
  export type ChallengeParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a ChallengeParticipant.
     */
    data: XOR<ChallengeParticipantCreateInput, ChallengeParticipantUncheckedCreateInput>
  }

  /**
   * ChallengeParticipant createMany
   */
  export type ChallengeParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChallengeParticipants.
     */
    data: ChallengeParticipantCreateManyInput | ChallengeParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChallengeParticipant createManyAndReturn
   */
  export type ChallengeParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * The data used to create many ChallengeParticipants.
     */
    data: ChallengeParticipantCreateManyInput | ChallengeParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChallengeParticipant update
   */
  export type ChallengeParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a ChallengeParticipant.
     */
    data: XOR<ChallengeParticipantUpdateInput, ChallengeParticipantUncheckedUpdateInput>
    /**
     * Choose, which ChallengeParticipant to update.
     */
    where: ChallengeParticipantWhereUniqueInput
  }

  /**
   * ChallengeParticipant updateMany
   */
  export type ChallengeParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChallengeParticipants.
     */
    data: XOR<ChallengeParticipantUpdateManyMutationInput, ChallengeParticipantUncheckedUpdateManyInput>
    /**
     * Filter which ChallengeParticipants to update
     */
    where?: ChallengeParticipantWhereInput
    /**
     * Limit how many ChallengeParticipants to update.
     */
    limit?: number
  }

  /**
   * ChallengeParticipant updateManyAndReturn
   */
  export type ChallengeParticipantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * The data used to update ChallengeParticipants.
     */
    data: XOR<ChallengeParticipantUpdateManyMutationInput, ChallengeParticipantUncheckedUpdateManyInput>
    /**
     * Filter which ChallengeParticipants to update
     */
    where?: ChallengeParticipantWhereInput
    /**
     * Limit how many ChallengeParticipants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChallengeParticipant upsert
   */
  export type ChallengeParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the ChallengeParticipant to update in case it exists.
     */
    where: ChallengeParticipantWhereUniqueInput
    /**
     * In case the ChallengeParticipant found by the `where` argument doesn't exist, create a new ChallengeParticipant with this data.
     */
    create: XOR<ChallengeParticipantCreateInput, ChallengeParticipantUncheckedCreateInput>
    /**
     * In case the ChallengeParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChallengeParticipantUpdateInput, ChallengeParticipantUncheckedUpdateInput>
  }

  /**
   * ChallengeParticipant delete
   */
  export type ChallengeParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
    /**
     * Filter which ChallengeParticipant to delete.
     */
    where: ChallengeParticipantWhereUniqueInput
  }

  /**
   * ChallengeParticipant deleteMany
   */
  export type ChallengeParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChallengeParticipants to delete
     */
    where?: ChallengeParticipantWhereInput
    /**
     * Limit how many ChallengeParticipants to delete.
     */
    limit?: number
  }

  /**
   * ChallengeParticipant.user
   */
  export type ChallengeParticipant$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ChallengeParticipant.team
   */
  export type ChallengeParticipant$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * ChallengeParticipant.activities
   */
  export type ChallengeParticipant$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * ChallengeParticipant.posts
   */
  export type ChallengeParticipant$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * ChallengeParticipant without action
   */
  export type ChallengeParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: ChallengeParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: ChallengeParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeParticipantInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    participantId: string | null
    notes: string | null
    date: Date | null
    uploadedAt: Date | null
    userId: string | null
    challengeId: string | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    participantId: string | null
    notes: string | null
    date: Date | null
    uploadedAt: Date | null
    userId: string | null
    challengeId: string | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    participantId: number
    notes: number
    date: number
    uploadedAt: number
    userId: number
    challengeId: number
    _all: number
  }


  export type ActivityMinAggregateInputType = {
    id?: true
    participantId?: true
    notes?: true
    date?: true
    uploadedAt?: true
    userId?: true
    challengeId?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    participantId?: true
    notes?: true
    date?: true
    uploadedAt?: true
    userId?: true
    challengeId?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    participantId?: true
    notes?: true
    date?: true
    uploadedAt?: true
    userId?: true
    challengeId?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    participantId: string
    notes: string | null
    date: Date
    uploadedAt: Date
    userId: string | null
    challengeId: string | null
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participantId?: boolean
    notes?: boolean
    date?: boolean
    uploadedAt?: boolean
    userId?: boolean
    challengeId?: boolean
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Activity$UserArgs<ExtArgs>
    Challenge?: boolean | Activity$ChallengeArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participantId?: boolean
    notes?: boolean
    date?: boolean
    uploadedAt?: boolean
    userId?: boolean
    challengeId?: boolean
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Activity$UserArgs<ExtArgs>
    Challenge?: boolean | Activity$ChallengeArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participantId?: boolean
    notes?: boolean
    date?: boolean
    uploadedAt?: boolean
    userId?: boolean
    challengeId?: boolean
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Activity$UserArgs<ExtArgs>
    Challenge?: boolean | Activity$ChallengeArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    participantId?: boolean
    notes?: boolean
    date?: boolean
    uploadedAt?: boolean
    userId?: boolean
    challengeId?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "participantId" | "notes" | "date" | "uploadedAt" | "userId" | "challengeId", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Activity$UserArgs<ExtArgs>
    Challenge?: boolean | Activity$ChallengeArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Activity$UserArgs<ExtArgs>
    Challenge?: boolean | Activity$ChallengeArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Activity$UserArgs<ExtArgs>
    Challenge?: boolean | Activity$ChallengeArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      participant: Prisma.$ChallengeParticipantPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs> | null
      Challenge: Prisma.$ChallengePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      participantId: string
      notes: string | null
      date: Date
      uploadedAt: Date
      userId: string | null
      challengeId: string | null
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participant<T extends ChallengeParticipantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeParticipantDefaultArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    User<T extends Activity$UserArgs<ExtArgs> = {}>(args?: Subset<T, Activity$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Challenge<T extends Activity$ChallengeArgs<ExtArgs> = {}>(args?: Subset<T, Activity$ChallengeArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly participantId: FieldRef<"Activity", 'String'>
    readonly notes: FieldRef<"Activity", 'String'>
    readonly date: FieldRef<"Activity", 'DateTime'>
    readonly uploadedAt: FieldRef<"Activity", 'DateTime'>
    readonly userId: FieldRef<"Activity", 'String'>
    readonly challengeId: FieldRef<"Activity", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity.User
   */
  export type Activity$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Activity.Challenge
   */
  export type Activity$ChallengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    where?: ChallengeWhereInput
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    participantId: string | null
    content: string | null
    imageUrl: string | null
    createdAt: Date | null
    userId: string | null
    challengeId: string | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    participantId: string | null
    content: string | null
    imageUrl: string | null
    createdAt: Date | null
    userId: string | null
    challengeId: string | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    participantId: number
    content: number
    imageUrl: number
    createdAt: number
    userId: number
    challengeId: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    participantId?: true
    content?: true
    imageUrl?: true
    createdAt?: true
    userId?: true
    challengeId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    participantId?: true
    content?: true
    imageUrl?: true
    createdAt?: true
    userId?: true
    challengeId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    participantId?: true
    content?: true
    imageUrl?: true
    createdAt?: true
    userId?: true
    challengeId?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    participantId: string
    content: string | null
    imageUrl: string | null
    createdAt: Date
    userId: string | null
    challengeId: string | null
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participantId?: boolean
    content?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    userId?: boolean
    challengeId?: boolean
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    comments?: boolean | Post$commentsArgs<ExtArgs>
    User?: boolean | Post$UserArgs<ExtArgs>
    Challenge?: boolean | Post$ChallengeArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participantId?: boolean
    content?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    userId?: boolean
    challengeId?: boolean
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Post$UserArgs<ExtArgs>
    Challenge?: boolean | Post$ChallengeArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participantId?: boolean
    content?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    userId?: boolean
    challengeId?: boolean
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Post$UserArgs<ExtArgs>
    Challenge?: boolean | Post$ChallengeArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    participantId?: boolean
    content?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    userId?: boolean
    challengeId?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "participantId" | "content" | "imageUrl" | "createdAt" | "userId" | "challengeId", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    comments?: boolean | Post$commentsArgs<ExtArgs>
    User?: boolean | Post$UserArgs<ExtArgs>
    Challenge?: boolean | Post$ChallengeArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Post$UserArgs<ExtArgs>
    Challenge?: boolean | Post$ChallengeArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant?: boolean | ChallengeParticipantDefaultArgs<ExtArgs>
    User?: boolean | Post$UserArgs<ExtArgs>
    Challenge?: boolean | Post$ChallengeArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      participant: Prisma.$ChallengeParticipantPayload<ExtArgs>
      comments: Prisma.$CommentPayload<ExtArgs>[]
      User: Prisma.$UserPayload<ExtArgs> | null
      Challenge: Prisma.$ChallengePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      participantId: string
      content: string | null
      imageUrl: string | null
      createdAt: Date
      userId: string | null
      challengeId: string | null
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participant<T extends ChallengeParticipantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeParticipantDefaultArgs<ExtArgs>>): Prisma__ChallengeParticipantClient<$Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comments<T extends Post$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    User<T extends Post$UserArgs<ExtArgs> = {}>(args?: Subset<T, Post$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Challenge<T extends Post$ChallengeArgs<ExtArgs> = {}>(args?: Subset<T, Post$ChallengeArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly participantId: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly imageUrl: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly userId: FieldRef<"Post", 'String'>
    readonly challengeId: FieldRef<"Post", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.comments
   */
  export type Post$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Post.User
   */
  export type Post$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Post.Challenge
   */
  export type Post$ChallengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    where?: ChallengeWhereInput
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    authorId: string | null
    postId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    authorId: string | null
    postId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    authorId: number
    postId: number
    content: number
    createdAt: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    authorId?: true
    postId?: true
    content?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    authorId?: true
    postId?: true
    content?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    authorId?: true
    postId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    authorId: string
    postId: string
    content: string | null
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    postId?: boolean
    content?: boolean
    createdAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    postId?: boolean
    content?: boolean
    createdAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    postId?: boolean
    content?: boolean
    createdAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    authorId?: boolean
    postId?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authorId" | "postId" | "content" | "createdAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      authorId: string
      postId: string
      content: string | null
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly authorId: FieldRef<"Comment", 'String'>
    readonly postId: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    creatorId: 'creatorId',
    name: 'name',
    description: 'description',
    avatarUrl: 'avatarUrl',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const TeamMembershipScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt',
    expiresAt: 'expiresAt'
  };

  export type TeamMembershipScalarFieldEnum = (typeof TeamMembershipScalarFieldEnum)[keyof typeof TeamMembershipScalarFieldEnum]


  export const ChallengeScalarFieldEnum: {
    id: 'id',
    creatorId: 'creatorId',
    title: 'title',
    description: 'description',
    challengeType: 'challengeType',
    maxParticipants: 'maxParticipants',
    startDate: 'startDate',
    endDate: 'endDate',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type ChallengeScalarFieldEnum = (typeof ChallengeScalarFieldEnum)[keyof typeof ChallengeScalarFieldEnum]


  export const ChallengeParticipantScalarFieldEnum: {
    id: 'id',
    challengeId: 'challengeId',
    userId: 'userId',
    teamId: 'teamId',
    joinedAt: 'joinedAt'
  };

  export type ChallengeParticipantScalarFieldEnum = (typeof ChallengeParticipantScalarFieldEnum)[keyof typeof ChallengeParticipantScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    participantId: 'participantId',
    notes: 'notes',
    date: 'date',
    uploadedAt: 'uploadedAt',
    userId: 'userId',
    challengeId: 'challengeId'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    participantId: 'participantId',
    content: 'content',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    userId: 'userId',
    challengeId: 'challengeId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    authorId: 'authorId',
    postId: 'postId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TeamRole'
   */
  export type EnumTeamRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TeamRole'>
    


  /**
   * Reference to a field of type 'TeamRole[]'
   */
  export type ListEnumTeamRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TeamRole[]'>
    


  /**
   * Reference to a field of type 'ChallengeParticipantType'
   */
  export type EnumChallengeParticipantTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChallengeParticipantType'>
    


  /**
   * Reference to a field of type 'ChallengeParticipantType[]'
   */
  export type ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChallengeParticipantType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    createdTeams?: TeamListRelationFilter
    teamMemberships?: TeamMembershipListRelationFilter
    createdChallenges?: ChallengeListRelationFilter
    challengeEntries?: ChallengeParticipantListRelationFilter
    activities?: ActivityListRelationFilter
    posts?: PostListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdTeams?: TeamOrderByRelationAggregateInput
    teamMemberships?: TeamMembershipOrderByRelationAggregateInput
    createdChallenges?: ChallengeOrderByRelationAggregateInput
    challengeEntries?: ChallengeParticipantOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdTeams?: TeamListRelationFilter
    teamMemberships?: TeamMembershipListRelationFilter
    createdChallenges?: ChallengeListRelationFilter
    challengeEntries?: ChallengeParticipantListRelationFilter
    activities?: ActivityListRelationFilter
    posts?: PostListRelationFilter
    comments?: CommentListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: UuidFilter<"Team"> | string
    creatorId?: UuidFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    avatarUrl?: StringNullableFilter<"Team"> | string | null
    isPublic?: BoolFilter<"Team"> | boolean
    createdAt?: DateTimeFilter<"Team"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Team"> | Date | string | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    teamMemberships?: TeamMembershipListRelationFilter
    challengeEntries?: ChallengeParticipantListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    creatorId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    creator?: UserOrderByWithRelationInput
    teamMemberships?: TeamMembershipOrderByRelationAggregateInput
    challengeEntries?: ChallengeParticipantOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    creatorId?: UuidFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    avatarUrl?: StringNullableFilter<"Team"> | string | null
    isPublic?: BoolFilter<"Team"> | boolean
    createdAt?: DateTimeFilter<"Team"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Team"> | Date | string | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    teamMemberships?: TeamMembershipListRelationFilter
    challengeEntries?: ChallengeParticipantListRelationFilter
  }, "id">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    creatorId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Team"> | string
    creatorId?: UuidWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    description?: StringNullableWithAggregatesFilter<"Team"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Team"> | string | null
    isPublic?: BoolWithAggregatesFilter<"Team"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Team"> | Date | string | null
  }

  export type TeamMembershipWhereInput = {
    AND?: TeamMembershipWhereInput | TeamMembershipWhereInput[]
    OR?: TeamMembershipWhereInput[]
    NOT?: TeamMembershipWhereInput | TeamMembershipWhereInput[]
    id?: UuidFilter<"TeamMembership"> | string
    teamId?: UuidFilter<"TeamMembership"> | string
    userId?: UuidFilter<"TeamMembership"> | string
    role?: EnumTeamRoleFilter<"TeamMembership"> | $Enums.TeamRole
    joinedAt?: DateTimeFilter<"TeamMembership"> | Date | string
    expiresAt?: DateTimeNullableFilter<"TeamMembership"> | Date | string | null
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TeamMembershipOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    team?: TeamOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TeamMembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamId_userId?: TeamMembershipTeamIdUserIdCompoundUniqueInput
    AND?: TeamMembershipWhereInput | TeamMembershipWhereInput[]
    OR?: TeamMembershipWhereInput[]
    NOT?: TeamMembershipWhereInput | TeamMembershipWhereInput[]
    teamId?: UuidFilter<"TeamMembership"> | string
    userId?: UuidFilter<"TeamMembership"> | string
    role?: EnumTeamRoleFilter<"TeamMembership"> | $Enums.TeamRole
    joinedAt?: DateTimeFilter<"TeamMembership"> | Date | string
    expiresAt?: DateTimeNullableFilter<"TeamMembership"> | Date | string | null
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "teamId_userId">

  export type TeamMembershipOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: TeamMembershipCountOrderByAggregateInput
    _max?: TeamMembershipMaxOrderByAggregateInput
    _min?: TeamMembershipMinOrderByAggregateInput
  }

  export type TeamMembershipScalarWhereWithAggregatesInput = {
    AND?: TeamMembershipScalarWhereWithAggregatesInput | TeamMembershipScalarWhereWithAggregatesInput[]
    OR?: TeamMembershipScalarWhereWithAggregatesInput[]
    NOT?: TeamMembershipScalarWhereWithAggregatesInput | TeamMembershipScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"TeamMembership"> | string
    teamId?: UuidWithAggregatesFilter<"TeamMembership"> | string
    userId?: UuidWithAggregatesFilter<"TeamMembership"> | string
    role?: EnumTeamRoleWithAggregatesFilter<"TeamMembership"> | $Enums.TeamRole
    joinedAt?: DateTimeWithAggregatesFilter<"TeamMembership"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"TeamMembership"> | Date | string | null
  }

  export type ChallengeWhereInput = {
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    id?: UuidFilter<"Challenge"> | string
    creatorId?: UuidFilter<"Challenge"> | string
    title?: StringFilter<"Challenge"> | string
    description?: StringNullableFilter<"Challenge"> | string | null
    challengeType?: EnumChallengeParticipantTypeFilter<"Challenge"> | $Enums.ChallengeParticipantType
    maxParticipants?: IntNullableFilter<"Challenge"> | number | null
    startDate?: DateTimeFilter<"Challenge"> | Date | string
    endDate?: DateTimeFilter<"Challenge"> | Date | string
    isPublic?: BoolFilter<"Challenge"> | boolean
    createdAt?: DateTimeFilter<"Challenge"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Challenge"> | Date | string | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    participants?: ChallengeParticipantListRelationFilter
    activities?: ActivityListRelationFilter
    posts?: PostListRelationFilter
  }

  export type ChallengeOrderByWithRelationInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    challengeType?: SortOrder
    maxParticipants?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    creator?: UserOrderByWithRelationInput
    participants?: ChallengeParticipantOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
  }

  export type ChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    creatorId?: UuidFilter<"Challenge"> | string
    title?: StringFilter<"Challenge"> | string
    description?: StringNullableFilter<"Challenge"> | string | null
    challengeType?: EnumChallengeParticipantTypeFilter<"Challenge"> | $Enums.ChallengeParticipantType
    maxParticipants?: IntNullableFilter<"Challenge"> | number | null
    startDate?: DateTimeFilter<"Challenge"> | Date | string
    endDate?: DateTimeFilter<"Challenge"> | Date | string
    isPublic?: BoolFilter<"Challenge"> | boolean
    createdAt?: DateTimeFilter<"Challenge"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Challenge"> | Date | string | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    participants?: ChallengeParticipantListRelationFilter
    activities?: ActivityListRelationFilter
    posts?: PostListRelationFilter
  }, "id">

  export type ChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    challengeType?: SortOrder
    maxParticipants?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: ChallengeCountOrderByAggregateInput
    _avg?: ChallengeAvgOrderByAggregateInput
    _max?: ChallengeMaxOrderByAggregateInput
    _min?: ChallengeMinOrderByAggregateInput
    _sum?: ChallengeSumOrderByAggregateInput
  }

  export type ChallengeScalarWhereWithAggregatesInput = {
    AND?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    OR?: ChallengeScalarWhereWithAggregatesInput[]
    NOT?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Challenge"> | string
    creatorId?: UuidWithAggregatesFilter<"Challenge"> | string
    title?: StringWithAggregatesFilter<"Challenge"> | string
    description?: StringNullableWithAggregatesFilter<"Challenge"> | string | null
    challengeType?: EnumChallengeParticipantTypeWithAggregatesFilter<"Challenge"> | $Enums.ChallengeParticipantType
    maxParticipants?: IntNullableWithAggregatesFilter<"Challenge"> | number | null
    startDate?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
    isPublic?: BoolWithAggregatesFilter<"Challenge"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Challenge"> | Date | string | null
  }

  export type ChallengeParticipantWhereInput = {
    AND?: ChallengeParticipantWhereInput | ChallengeParticipantWhereInput[]
    OR?: ChallengeParticipantWhereInput[]
    NOT?: ChallengeParticipantWhereInput | ChallengeParticipantWhereInput[]
    id?: UuidFilter<"ChallengeParticipant"> | string
    challengeId?: UuidFilter<"ChallengeParticipant"> | string
    userId?: UuidNullableFilter<"ChallengeParticipant"> | string | null
    teamId?: UuidNullableFilter<"ChallengeParticipant"> | string | null
    joinedAt?: DateTimeFilter<"ChallengeParticipant"> | Date | string
    challenge?: XOR<ChallengeScalarRelationFilter, ChallengeWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    activities?: ActivityListRelationFilter
    posts?: PostListRelationFilter
  }

  export type ChallengeParticipantOrderByWithRelationInput = {
    id?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    challenge?: ChallengeOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
    activities?: ActivityOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
  }

  export type ChallengeParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    challengeId_userId?: ChallengeParticipantChallengeIdUserIdCompoundUniqueInput
    challengeId_teamId?: ChallengeParticipantChallengeIdTeamIdCompoundUniqueInput
    AND?: ChallengeParticipantWhereInput | ChallengeParticipantWhereInput[]
    OR?: ChallengeParticipantWhereInput[]
    NOT?: ChallengeParticipantWhereInput | ChallengeParticipantWhereInput[]
    challengeId?: UuidFilter<"ChallengeParticipant"> | string
    userId?: UuidNullableFilter<"ChallengeParticipant"> | string | null
    teamId?: UuidNullableFilter<"ChallengeParticipant"> | string | null
    joinedAt?: DateTimeFilter<"ChallengeParticipant"> | Date | string
    challenge?: XOR<ChallengeScalarRelationFilter, ChallengeWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    activities?: ActivityListRelationFilter
    posts?: PostListRelationFilter
  }, "id" | "challengeId_userId" | "challengeId_teamId">

  export type ChallengeParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    _count?: ChallengeParticipantCountOrderByAggregateInput
    _max?: ChallengeParticipantMaxOrderByAggregateInput
    _min?: ChallengeParticipantMinOrderByAggregateInput
  }

  export type ChallengeParticipantScalarWhereWithAggregatesInput = {
    AND?: ChallengeParticipantScalarWhereWithAggregatesInput | ChallengeParticipantScalarWhereWithAggregatesInput[]
    OR?: ChallengeParticipantScalarWhereWithAggregatesInput[]
    NOT?: ChallengeParticipantScalarWhereWithAggregatesInput | ChallengeParticipantScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ChallengeParticipant"> | string
    challengeId?: UuidWithAggregatesFilter<"ChallengeParticipant"> | string
    userId?: UuidNullableWithAggregatesFilter<"ChallengeParticipant"> | string | null
    teamId?: UuidNullableWithAggregatesFilter<"ChallengeParticipant"> | string | null
    joinedAt?: DateTimeWithAggregatesFilter<"ChallengeParticipant"> | Date | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: UuidFilter<"Activity"> | string
    participantId?: UuidFilter<"Activity"> | string
    notes?: StringNullableFilter<"Activity"> | string | null
    date?: DateTimeFilter<"Activity"> | Date | string
    uploadedAt?: DateTimeFilter<"Activity"> | Date | string
    userId?: UuidNullableFilter<"Activity"> | string | null
    challengeId?: UuidNullableFilter<"Activity"> | string | null
    participant?: XOR<ChallengeParticipantScalarRelationFilter, ChallengeParticipantWhereInput>
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    Challenge?: XOR<ChallengeNullableScalarRelationFilter, ChallengeWhereInput> | null
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    participantId?: SortOrder
    notes?: SortOrderInput | SortOrder
    date?: SortOrder
    uploadedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    challengeId?: SortOrderInput | SortOrder
    participant?: ChallengeParticipantOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
    Challenge?: ChallengeOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    participantId?: UuidFilter<"Activity"> | string
    notes?: StringNullableFilter<"Activity"> | string | null
    date?: DateTimeFilter<"Activity"> | Date | string
    uploadedAt?: DateTimeFilter<"Activity"> | Date | string
    userId?: UuidNullableFilter<"Activity"> | string | null
    challengeId?: UuidNullableFilter<"Activity"> | string | null
    participant?: XOR<ChallengeParticipantScalarRelationFilter, ChallengeParticipantWhereInput>
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    Challenge?: XOR<ChallengeNullableScalarRelationFilter, ChallengeWhereInput> | null
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    participantId?: SortOrder
    notes?: SortOrderInput | SortOrder
    date?: SortOrder
    uploadedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    challengeId?: SortOrderInput | SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Activity"> | string
    participantId?: UuidWithAggregatesFilter<"Activity"> | string
    notes?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    date?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    uploadedAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    userId?: UuidNullableWithAggregatesFilter<"Activity"> | string | null
    challengeId?: UuidNullableWithAggregatesFilter<"Activity"> | string | null
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: UuidFilter<"Post"> | string
    participantId?: UuidFilter<"Post"> | string
    content?: StringNullableFilter<"Post"> | string | null
    imageUrl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    userId?: UuidNullableFilter<"Post"> | string | null
    challengeId?: UuidNullableFilter<"Post"> | string | null
    participant?: XOR<ChallengeParticipantScalarRelationFilter, ChallengeParticipantWhereInput>
    comments?: CommentListRelationFilter
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    Challenge?: XOR<ChallengeNullableScalarRelationFilter, ChallengeWhereInput> | null
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    participantId?: SortOrder
    content?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    challengeId?: SortOrderInput | SortOrder
    participant?: ChallengeParticipantOrderByWithRelationInput
    comments?: CommentOrderByRelationAggregateInput
    User?: UserOrderByWithRelationInput
    Challenge?: ChallengeOrderByWithRelationInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    participantId?: UuidFilter<"Post"> | string
    content?: StringNullableFilter<"Post"> | string | null
    imageUrl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    userId?: UuidNullableFilter<"Post"> | string | null
    challengeId?: UuidNullableFilter<"Post"> | string | null
    participant?: XOR<ChallengeParticipantScalarRelationFilter, ChallengeParticipantWhereInput>
    comments?: CommentListRelationFilter
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    Challenge?: XOR<ChallengeNullableScalarRelationFilter, ChallengeWhereInput> | null
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    participantId?: SortOrder
    content?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    challengeId?: SortOrderInput | SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Post"> | string
    participantId?: UuidWithAggregatesFilter<"Post"> | string
    content?: StringNullableWithAggregatesFilter<"Post"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Post"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    userId?: UuidNullableWithAggregatesFilter<"Post"> | string | null
    challengeId?: UuidNullableWithAggregatesFilter<"Post"> | string | null
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: UuidFilter<"Comment"> | string
    authorId?: UuidFilter<"Comment"> | string
    postId?: UuidFilter<"Comment"> | string
    content?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    authorId?: SortOrder
    postId?: SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    author?: UserOrderByWithRelationInput
    post?: PostOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    authorId?: UuidFilter<"Comment"> | string
    postId?: UuidFilter<"Comment"> | string
    content?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    authorId?: SortOrder
    postId?: SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Comment"> | string
    authorId?: UuidWithAggregatesFilter<"Comment"> | string
    postId?: UuidWithAggregatesFilter<"Comment"> | string
    content?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutUserInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeUncheckedCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutUserNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUncheckedUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedTeamsInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutTeamInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    creatorId: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutTeamInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutTeamNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    creatorId: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamMembershipCreateInput = {
    id?: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
    team: TeamCreateNestedOneWithoutTeamMembershipsInput
    user: UserCreateNestedOneWithoutTeamMembershipsInput
  }

  export type TeamMembershipUncheckedCreateInput = {
    id?: string
    teamId: string
    userId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type TeamMembershipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    team?: TeamUpdateOneRequiredWithoutTeamMembershipsNestedInput
    user?: UserUpdateOneRequiredWithoutTeamMembershipsNestedInput
  }

  export type TeamMembershipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamMembershipCreateManyInput = {
    id?: string
    teamId: string
    userId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type TeamMembershipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamMembershipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChallengeCreateInput = {
    id?: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedChallengesInput
    participants?: ChallengeParticipantCreateNestedManyWithoutChallengeInput
    activities?: ActivityCreateNestedManyWithoutChallengeInput
    posts?: PostCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateInput = {
    id?: string
    creatorId: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    participants?: ChallengeParticipantUncheckedCreateNestedManyWithoutChallengeInput
    activities?: ActivityUncheckedCreateNestedManyWithoutChallengeInput
    posts?: PostUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedChallengesNestedInput
    participants?: ChallengeParticipantUpdateManyWithoutChallengeNestedInput
    activities?: ActivityUpdateManyWithoutChallengeNestedInput
    posts?: PostUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: ChallengeParticipantUncheckedUpdateManyWithoutChallengeNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutChallengeNestedInput
    posts?: PostUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeCreateManyInput = {
    id?: string
    creatorId: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type ChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChallengeParticipantCreateInput = {
    id?: string
    joinedAt?: Date | string
    challenge: ChallengeCreateNestedOneWithoutParticipantsInput
    user?: UserCreateNestedOneWithoutChallengeEntriesInput
    team?: TeamCreateNestedOneWithoutChallengeEntriesInput
    activities?: ActivityCreateNestedManyWithoutParticipantInput
    posts?: PostCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantUncheckedCreateInput = {
    id?: string
    challengeId: string
    userId?: string | null
    teamId?: string | null
    joinedAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutParticipantInput
    posts?: PostUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenge?: ChallengeUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneWithoutChallengeEntriesNestedInput
    team?: TeamUpdateOneWithoutChallengeEntriesNestedInput
    activities?: ActivityUpdateManyWithoutParticipantNestedInput
    posts?: PostUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutParticipantNestedInput
    posts?: PostUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantCreateManyInput = {
    id?: string
    challengeId: string
    userId?: string | null
    teamId?: string | null
    joinedAt?: Date | string
  }

  export type ChallengeParticipantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeParticipantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    id?: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    participant: ChallengeParticipantCreateNestedOneWithoutActivitiesInput
    User?: UserCreateNestedOneWithoutActivitiesInput
    Challenge?: ChallengeCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    participantId: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    userId?: string | null
    challengeId?: string | null
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: ChallengeParticipantUpdateOneRequiredWithoutActivitiesNestedInput
    User?: UserUpdateOneWithoutActivitiesNestedInput
    Challenge?: ChallengeUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityCreateManyInput = {
    id?: string
    participantId: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    userId?: string | null
    challengeId?: string | null
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostCreateInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    participant: ChallengeParticipantCreateNestedOneWithoutPostsInput
    comments?: CommentCreateNestedManyWithoutPostInput
    User?: UserCreateNestedOneWithoutPostsInput
    Challenge?: ChallengeCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    participantId: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    userId?: string | null
    challengeId?: string | null
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: ChallengeParticipantUpdateOneRequiredWithoutPostsNestedInput
    comments?: CommentUpdateManyWithoutPostNestedInput
    User?: UserUpdateOneWithoutPostsNestedInput
    Challenge?: ChallengeUpdateOneWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: string
    participantId: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    userId?: string | null
    challengeId?: string | null
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentCreateInput = {
    id?: string
    content?: string | null
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutCommentsInput
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    authorId: string
    postId: string
    content?: string | null
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutCommentsNestedInput
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: string
    authorId: string
    postId: string
    content?: string | null
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type TeamMembershipListRelationFilter = {
    every?: TeamMembershipWhereInput
    some?: TeamMembershipWhereInput
    none?: TeamMembershipWhereInput
  }

  export type ChallengeListRelationFilter = {
    every?: ChallengeWhereInput
    some?: ChallengeWhereInput
    none?: ChallengeWhereInput
  }

  export type ChallengeParticipantListRelationFilter = {
    every?: ChallengeParticipantWhereInput
    some?: ChallengeParticipantWhereInput
    none?: ChallengeParticipantWhereInput
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChallengeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChallengeParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatarUrl?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatarUrl?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatarUrl?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTeamRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTeamRoleFilter<$PrismaModel> | $Enums.TeamRole
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TeamMembershipTeamIdUserIdCompoundUniqueInput = {
    teamId: string
    userId: string
  }

  export type TeamMembershipCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type TeamMembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type TeamMembershipMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type EnumTeamRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel> | $Enums.TeamRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTeamRoleFilter<$PrismaModel>
    _max?: NestedEnumTeamRoleFilter<$PrismaModel>
  }

  export type EnumChallengeParticipantTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChallengeParticipantType | EnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChallengeParticipantType[] | ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChallengeParticipantType[] | ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChallengeParticipantTypeFilter<$PrismaModel> | $Enums.ChallengeParticipantType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    challengeType?: SortOrder
    maxParticipants?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ChallengeAvgOrderByAggregateInput = {
    maxParticipants?: SortOrder
  }

  export type ChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    challengeType?: SortOrder
    maxParticipants?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    challengeType?: SortOrder
    maxParticipants?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ChallengeSumOrderByAggregateInput = {
    maxParticipants?: SortOrder
  }

  export type EnumChallengeParticipantTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChallengeParticipantType | EnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChallengeParticipantType[] | ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChallengeParticipantType[] | ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChallengeParticipantTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChallengeParticipantType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChallengeParticipantTypeFilter<$PrismaModel>
    _max?: NestedEnumChallengeParticipantTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type ChallengeScalarRelationFilter = {
    is?: ChallengeWhereInput
    isNot?: ChallengeWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TeamNullableScalarRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type ChallengeParticipantChallengeIdUserIdCompoundUniqueInput = {
    challengeId: string
    userId: string
  }

  export type ChallengeParticipantChallengeIdTeamIdCompoundUniqueInput = {
    challengeId: string
    teamId: string
  }

  export type ChallengeParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ChallengeParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ChallengeParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    joinedAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ChallengeParticipantScalarRelationFilter = {
    is?: ChallengeParticipantWhereInput
    isNot?: ChallengeParticipantWhereInput
  }

  export type ChallengeNullableScalarRelationFilter = {
    is?: ChallengeWhereInput | null
    isNot?: ChallengeWhereInput | null
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    notes?: SortOrder
    date?: SortOrder
    uploadedAt?: SortOrder
    userId?: SortOrder
    challengeId?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    notes?: SortOrder
    date?: SortOrder
    uploadedAt?: SortOrder
    userId?: SortOrder
    challengeId?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    notes?: SortOrder
    date?: SortOrder
    uploadedAt?: SortOrder
    userId?: SortOrder
    challengeId?: SortOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    challengeId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    challengeId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    challengeId?: SortOrder
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TeamCreateWithoutCreatorInput, TeamUncheckedCreateWithoutCreatorInput> | TeamCreateWithoutCreatorInput[] | TeamUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatorInput | TeamCreateOrConnectWithoutCreatorInput[]
    createMany?: TeamCreateManyCreatorInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TeamMembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput> | TeamMembershipCreateWithoutUserInput[] | TeamMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutUserInput | TeamMembershipCreateOrConnectWithoutUserInput[]
    createMany?: TeamMembershipCreateManyUserInputEnvelope
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
  }

  export type ChallengeCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ChallengeCreateWithoutCreatorInput, ChallengeUncheckedCreateWithoutCreatorInput> | ChallengeCreateWithoutCreatorInput[] | ChallengeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutCreatorInput | ChallengeCreateOrConnectWithoutCreatorInput[]
    createMany?: ChallengeCreateManyCreatorInputEnvelope
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type ChallengeParticipantCreateNestedManyWithoutUserInput = {
    create?: XOR<ChallengeParticipantCreateWithoutUserInput, ChallengeParticipantUncheckedCreateWithoutUserInput> | ChallengeParticipantCreateWithoutUserInput[] | ChallengeParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutUserInput | ChallengeParticipantCreateOrConnectWithoutUserInput[]
    createMany?: ChallengeParticipantCreateManyUserInputEnvelope
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TeamCreateWithoutCreatorInput, TeamUncheckedCreateWithoutCreatorInput> | TeamCreateWithoutCreatorInput[] | TeamUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatorInput | TeamCreateOrConnectWithoutCreatorInput[]
    createMany?: TeamCreateManyCreatorInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TeamMembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput> | TeamMembershipCreateWithoutUserInput[] | TeamMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutUserInput | TeamMembershipCreateOrConnectWithoutUserInput[]
    createMany?: TeamMembershipCreateManyUserInputEnvelope
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
  }

  export type ChallengeUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ChallengeCreateWithoutCreatorInput, ChallengeUncheckedCreateWithoutCreatorInput> | ChallengeCreateWithoutCreatorInput[] | ChallengeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutCreatorInput | ChallengeCreateOrConnectWithoutCreatorInput[]
    createMany?: ChallengeCreateManyCreatorInputEnvelope
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChallengeParticipantCreateWithoutUserInput, ChallengeParticipantUncheckedCreateWithoutUserInput> | ChallengeParticipantCreateWithoutUserInput[] | ChallengeParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutUserInput | ChallengeParticipantCreateOrConnectWithoutUserInput[]
    createMany?: ChallengeParticipantCreateManyUserInputEnvelope
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type TeamUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TeamCreateWithoutCreatorInput, TeamUncheckedCreateWithoutCreatorInput> | TeamCreateWithoutCreatorInput[] | TeamUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatorInput | TeamCreateOrConnectWithoutCreatorInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCreatorInput | TeamUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TeamCreateManyCreatorInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCreatorInput | TeamUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCreatorInput | TeamUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TeamMembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput> | TeamMembershipCreateWithoutUserInput[] | TeamMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutUserInput | TeamMembershipCreateOrConnectWithoutUserInput[]
    upsert?: TeamMembershipUpsertWithWhereUniqueWithoutUserInput | TeamMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMembershipCreateManyUserInputEnvelope
    set?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    disconnect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    delete?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    update?: TeamMembershipUpdateWithWhereUniqueWithoutUserInput | TeamMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMembershipUpdateManyWithWhereWithoutUserInput | TeamMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
  }

  export type ChallengeUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ChallengeCreateWithoutCreatorInput, ChallengeUncheckedCreateWithoutCreatorInput> | ChallengeCreateWithoutCreatorInput[] | ChallengeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutCreatorInput | ChallengeCreateOrConnectWithoutCreatorInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutCreatorInput | ChallengeUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ChallengeCreateManyCreatorInputEnvelope
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutCreatorInput | ChallengeUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutCreatorInput | ChallengeUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type ChallengeParticipantUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChallengeParticipantCreateWithoutUserInput, ChallengeParticipantUncheckedCreateWithoutUserInput> | ChallengeParticipantCreateWithoutUserInput[] | ChallengeParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutUserInput | ChallengeParticipantCreateOrConnectWithoutUserInput[]
    upsert?: ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput | ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChallengeParticipantCreateManyUserInputEnvelope
    set?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    disconnect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    delete?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    update?: ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput | ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChallengeParticipantUpdateManyWithWhereWithoutUserInput | ChallengeParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChallengeParticipantScalarWhereInput | ChallengeParticipantScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type PostUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TeamCreateWithoutCreatorInput, TeamUncheckedCreateWithoutCreatorInput> | TeamCreateWithoutCreatorInput[] | TeamUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCreatorInput | TeamCreateOrConnectWithoutCreatorInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCreatorInput | TeamUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TeamCreateManyCreatorInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCreatorInput | TeamUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCreatorInput | TeamUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TeamMembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput> | TeamMembershipCreateWithoutUserInput[] | TeamMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutUserInput | TeamMembershipCreateOrConnectWithoutUserInput[]
    upsert?: TeamMembershipUpsertWithWhereUniqueWithoutUserInput | TeamMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMembershipCreateManyUserInputEnvelope
    set?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    disconnect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    delete?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    update?: TeamMembershipUpdateWithWhereUniqueWithoutUserInput | TeamMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMembershipUpdateManyWithWhereWithoutUserInput | TeamMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
  }

  export type ChallengeUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ChallengeCreateWithoutCreatorInput, ChallengeUncheckedCreateWithoutCreatorInput> | ChallengeCreateWithoutCreatorInput[] | ChallengeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutCreatorInput | ChallengeCreateOrConnectWithoutCreatorInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutCreatorInput | ChallengeUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ChallengeCreateManyCreatorInputEnvelope
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutCreatorInput | ChallengeUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutCreatorInput | ChallengeUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChallengeParticipantCreateWithoutUserInput, ChallengeParticipantUncheckedCreateWithoutUserInput> | ChallengeParticipantCreateWithoutUserInput[] | ChallengeParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutUserInput | ChallengeParticipantCreateOrConnectWithoutUserInput[]
    upsert?: ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput | ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChallengeParticipantCreateManyUserInputEnvelope
    set?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    disconnect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    delete?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    update?: ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput | ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChallengeParticipantUpdateManyWithWhereWithoutUserInput | ChallengeParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChallengeParticipantScalarWhereInput | ChallengeParticipantScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedTeamsInput = {
    create?: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTeamsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamMembershipCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput> | TeamMembershipCreateWithoutTeamInput[] | TeamMembershipUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutTeamInput | TeamMembershipCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMembershipCreateManyTeamInputEnvelope
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
  }

  export type ChallengeParticipantCreateNestedManyWithoutTeamInput = {
    create?: XOR<ChallengeParticipantCreateWithoutTeamInput, ChallengeParticipantUncheckedCreateWithoutTeamInput> | ChallengeParticipantCreateWithoutTeamInput[] | ChallengeParticipantUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutTeamInput | ChallengeParticipantCreateOrConnectWithoutTeamInput[]
    createMany?: ChallengeParticipantCreateManyTeamInputEnvelope
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
  }

  export type TeamMembershipUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput> | TeamMembershipCreateWithoutTeamInput[] | TeamMembershipUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutTeamInput | TeamMembershipCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMembershipCreateManyTeamInputEnvelope
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
  }

  export type ChallengeParticipantUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<ChallengeParticipantCreateWithoutTeamInput, ChallengeParticipantUncheckedCreateWithoutTeamInput> | ChallengeParticipantCreateWithoutTeamInput[] | ChallengeParticipantUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutTeamInput | ChallengeParticipantCreateOrConnectWithoutTeamInput[]
    createMany?: ChallengeParticipantCreateManyTeamInputEnvelope
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutCreatedTeamsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTeamsInput
    upsert?: UserUpsertWithoutCreatedTeamsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTeamsInput, UserUpdateWithoutCreatedTeamsInput>, UserUncheckedUpdateWithoutCreatedTeamsInput>
  }

  export type TeamMembershipUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput> | TeamMembershipCreateWithoutTeamInput[] | TeamMembershipUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutTeamInput | TeamMembershipCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMembershipUpsertWithWhereUniqueWithoutTeamInput | TeamMembershipUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMembershipCreateManyTeamInputEnvelope
    set?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    disconnect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    delete?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    update?: TeamMembershipUpdateWithWhereUniqueWithoutTeamInput | TeamMembershipUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMembershipUpdateManyWithWhereWithoutTeamInput | TeamMembershipUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
  }

  export type ChallengeParticipantUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ChallengeParticipantCreateWithoutTeamInput, ChallengeParticipantUncheckedCreateWithoutTeamInput> | ChallengeParticipantCreateWithoutTeamInput[] | ChallengeParticipantUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutTeamInput | ChallengeParticipantCreateOrConnectWithoutTeamInput[]
    upsert?: ChallengeParticipantUpsertWithWhereUniqueWithoutTeamInput | ChallengeParticipantUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ChallengeParticipantCreateManyTeamInputEnvelope
    set?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    disconnect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    delete?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    update?: ChallengeParticipantUpdateWithWhereUniqueWithoutTeamInput | ChallengeParticipantUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ChallengeParticipantUpdateManyWithWhereWithoutTeamInput | ChallengeParticipantUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ChallengeParticipantScalarWhereInput | ChallengeParticipantScalarWhereInput[]
  }

  export type TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput> | TeamMembershipCreateWithoutTeamInput[] | TeamMembershipUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMembershipCreateOrConnectWithoutTeamInput | TeamMembershipCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMembershipUpsertWithWhereUniqueWithoutTeamInput | TeamMembershipUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMembershipCreateManyTeamInputEnvelope
    set?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    disconnect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    delete?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    connect?: TeamMembershipWhereUniqueInput | TeamMembershipWhereUniqueInput[]
    update?: TeamMembershipUpdateWithWhereUniqueWithoutTeamInput | TeamMembershipUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMembershipUpdateManyWithWhereWithoutTeamInput | TeamMembershipUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
  }

  export type ChallengeParticipantUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ChallengeParticipantCreateWithoutTeamInput, ChallengeParticipantUncheckedCreateWithoutTeamInput> | ChallengeParticipantCreateWithoutTeamInput[] | ChallengeParticipantUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutTeamInput | ChallengeParticipantCreateOrConnectWithoutTeamInput[]
    upsert?: ChallengeParticipantUpsertWithWhereUniqueWithoutTeamInput | ChallengeParticipantUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ChallengeParticipantCreateManyTeamInputEnvelope
    set?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    disconnect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    delete?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    update?: ChallengeParticipantUpdateWithWhereUniqueWithoutTeamInput | ChallengeParticipantUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ChallengeParticipantUpdateManyWithWhereWithoutTeamInput | ChallengeParticipantUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ChallengeParticipantScalarWhereInput | ChallengeParticipantScalarWhereInput[]
  }

  export type TeamCreateNestedOneWithoutTeamMembershipsInput = {
    create?: XOR<TeamCreateWithoutTeamMembershipsInput, TeamUncheckedCreateWithoutTeamMembershipsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamMembershipsInput
    connect?: TeamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTeamMembershipsInput = {
    create?: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTeamRoleFieldUpdateOperationsInput = {
    set?: $Enums.TeamRole
  }

  export type TeamUpdateOneRequiredWithoutTeamMembershipsNestedInput = {
    create?: XOR<TeamCreateWithoutTeamMembershipsInput, TeamUncheckedCreateWithoutTeamMembershipsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamMembershipsInput
    upsert?: TeamUpsertWithoutTeamMembershipsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutTeamMembershipsInput, TeamUpdateWithoutTeamMembershipsInput>, TeamUncheckedUpdateWithoutTeamMembershipsInput>
  }

  export type UserUpdateOneRequiredWithoutTeamMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembershipsInput
    upsert?: UserUpsertWithoutTeamMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeamMembershipsInput, UserUpdateWithoutTeamMembershipsInput>, UserUncheckedUpdateWithoutTeamMembershipsInput>
  }

  export type UserCreateNestedOneWithoutCreatedChallengesInput = {
    create?: XOR<UserCreateWithoutCreatedChallengesInput, UserUncheckedCreateWithoutCreatedChallengesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedChallengesInput
    connect?: UserWhereUniqueInput
  }

  export type ChallengeParticipantCreateNestedManyWithoutChallengeInput = {
    create?: XOR<ChallengeParticipantCreateWithoutChallengeInput, ChallengeParticipantUncheckedCreateWithoutChallengeInput> | ChallengeParticipantCreateWithoutChallengeInput[] | ChallengeParticipantUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutChallengeInput | ChallengeParticipantCreateOrConnectWithoutChallengeInput[]
    createMany?: ChallengeParticipantCreateManyChallengeInputEnvelope
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutChallengeInput = {
    create?: XOR<ActivityCreateWithoutChallengeInput, ActivityUncheckedCreateWithoutChallengeInput> | ActivityCreateWithoutChallengeInput[] | ActivityUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutChallengeInput | ActivityCreateOrConnectWithoutChallengeInput[]
    createMany?: ActivityCreateManyChallengeInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutChallengeInput = {
    create?: XOR<PostCreateWithoutChallengeInput, PostUncheckedCreateWithoutChallengeInput> | PostCreateWithoutChallengeInput[] | PostUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: PostCreateOrConnectWithoutChallengeInput | PostCreateOrConnectWithoutChallengeInput[]
    createMany?: PostCreateManyChallengeInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ChallengeParticipantUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: XOR<ChallengeParticipantCreateWithoutChallengeInput, ChallengeParticipantUncheckedCreateWithoutChallengeInput> | ChallengeParticipantCreateWithoutChallengeInput[] | ChallengeParticipantUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutChallengeInput | ChallengeParticipantCreateOrConnectWithoutChallengeInput[]
    createMany?: ChallengeParticipantCreateManyChallengeInputEnvelope
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: XOR<ActivityCreateWithoutChallengeInput, ActivityUncheckedCreateWithoutChallengeInput> | ActivityCreateWithoutChallengeInput[] | ActivityUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutChallengeInput | ActivityCreateOrConnectWithoutChallengeInput[]
    createMany?: ActivityCreateManyChallengeInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: XOR<PostCreateWithoutChallengeInput, PostUncheckedCreateWithoutChallengeInput> | PostCreateWithoutChallengeInput[] | PostUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: PostCreateOrConnectWithoutChallengeInput | PostCreateOrConnectWithoutChallengeInput[]
    createMany?: PostCreateManyChallengeInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type EnumChallengeParticipantTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChallengeParticipantType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCreatedChallengesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedChallengesInput, UserUncheckedCreateWithoutCreatedChallengesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedChallengesInput
    upsert?: UserUpsertWithoutCreatedChallengesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedChallengesInput, UserUpdateWithoutCreatedChallengesInput>, UserUncheckedUpdateWithoutCreatedChallengesInput>
  }

  export type ChallengeParticipantUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<ChallengeParticipantCreateWithoutChallengeInput, ChallengeParticipantUncheckedCreateWithoutChallengeInput> | ChallengeParticipantCreateWithoutChallengeInput[] | ChallengeParticipantUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutChallengeInput | ChallengeParticipantCreateOrConnectWithoutChallengeInput[]
    upsert?: ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput | ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: ChallengeParticipantCreateManyChallengeInputEnvelope
    set?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    disconnect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    delete?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    update?: ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput | ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput | ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: ChallengeParticipantScalarWhereInput | ChallengeParticipantScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<ActivityCreateWithoutChallengeInput, ActivityUncheckedCreateWithoutChallengeInput> | ActivityCreateWithoutChallengeInput[] | ActivityUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutChallengeInput | ActivityCreateOrConnectWithoutChallengeInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutChallengeInput | ActivityUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: ActivityCreateManyChallengeInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutChallengeInput | ActivityUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutChallengeInput | ActivityUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type PostUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<PostCreateWithoutChallengeInput, PostUncheckedCreateWithoutChallengeInput> | PostCreateWithoutChallengeInput[] | PostUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: PostCreateOrConnectWithoutChallengeInput | PostCreateOrConnectWithoutChallengeInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutChallengeInput | PostUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: PostCreateManyChallengeInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutChallengeInput | PostUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: PostUpdateManyWithWhereWithoutChallengeInput | PostUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ChallengeParticipantUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<ChallengeParticipantCreateWithoutChallengeInput, ChallengeParticipantUncheckedCreateWithoutChallengeInput> | ChallengeParticipantCreateWithoutChallengeInput[] | ChallengeParticipantUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutChallengeInput | ChallengeParticipantCreateOrConnectWithoutChallengeInput[]
    upsert?: ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput | ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: ChallengeParticipantCreateManyChallengeInputEnvelope
    set?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    disconnect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    delete?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    connect?: ChallengeParticipantWhereUniqueInput | ChallengeParticipantWhereUniqueInput[]
    update?: ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput | ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput | ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: ChallengeParticipantScalarWhereInput | ChallengeParticipantScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<ActivityCreateWithoutChallengeInput, ActivityUncheckedCreateWithoutChallengeInput> | ActivityCreateWithoutChallengeInput[] | ActivityUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutChallengeInput | ActivityCreateOrConnectWithoutChallengeInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutChallengeInput | ActivityUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: ActivityCreateManyChallengeInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutChallengeInput | ActivityUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutChallengeInput | ActivityUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<PostCreateWithoutChallengeInput, PostUncheckedCreateWithoutChallengeInput> | PostCreateWithoutChallengeInput[] | PostUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: PostCreateOrConnectWithoutChallengeInput | PostCreateOrConnectWithoutChallengeInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutChallengeInput | PostUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: PostCreateManyChallengeInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutChallengeInput | PostUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: PostUpdateManyWithWhereWithoutChallengeInput | PostUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ChallengeCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<ChallengeCreateWithoutParticipantsInput, ChallengeUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutParticipantsInput
    connect?: ChallengeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutChallengeEntriesInput = {
    create?: XOR<UserCreateWithoutChallengeEntriesInput, UserUncheckedCreateWithoutChallengeEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChallengeEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutChallengeEntriesInput = {
    create?: XOR<TeamCreateWithoutChallengeEntriesInput, TeamUncheckedCreateWithoutChallengeEntriesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutChallengeEntriesInput
    connect?: TeamWhereUniqueInput
  }

  export type ActivityCreateNestedManyWithoutParticipantInput = {
    create?: XOR<ActivityCreateWithoutParticipantInput, ActivityUncheckedCreateWithoutParticipantInput> | ActivityCreateWithoutParticipantInput[] | ActivityUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutParticipantInput | ActivityCreateOrConnectWithoutParticipantInput[]
    createMany?: ActivityCreateManyParticipantInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutParticipantInput = {
    create?: XOR<PostCreateWithoutParticipantInput, PostUncheckedCreateWithoutParticipantInput> | PostCreateWithoutParticipantInput[] | PostUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: PostCreateOrConnectWithoutParticipantInput | PostCreateOrConnectWithoutParticipantInput[]
    createMany?: PostCreateManyParticipantInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutParticipantInput = {
    create?: XOR<ActivityCreateWithoutParticipantInput, ActivityUncheckedCreateWithoutParticipantInput> | ActivityCreateWithoutParticipantInput[] | ActivityUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutParticipantInput | ActivityCreateOrConnectWithoutParticipantInput[]
    createMany?: ActivityCreateManyParticipantInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutParticipantInput = {
    create?: XOR<PostCreateWithoutParticipantInput, PostUncheckedCreateWithoutParticipantInput> | PostCreateWithoutParticipantInput[] | PostUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: PostCreateOrConnectWithoutParticipantInput | PostCreateOrConnectWithoutParticipantInput[]
    createMany?: PostCreateManyParticipantInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ChallengeUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<ChallengeCreateWithoutParticipantsInput, ChallengeUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutParticipantsInput
    upsert?: ChallengeUpsertWithoutParticipantsInput
    connect?: ChallengeWhereUniqueInput
    update?: XOR<XOR<ChallengeUpdateToOneWithWhereWithoutParticipantsInput, ChallengeUpdateWithoutParticipantsInput>, ChallengeUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserUpdateOneWithoutChallengeEntriesNestedInput = {
    create?: XOR<UserCreateWithoutChallengeEntriesInput, UserUncheckedCreateWithoutChallengeEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChallengeEntriesInput
    upsert?: UserUpsertWithoutChallengeEntriesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChallengeEntriesInput, UserUpdateWithoutChallengeEntriesInput>, UserUncheckedUpdateWithoutChallengeEntriesInput>
  }

  export type TeamUpdateOneWithoutChallengeEntriesNestedInput = {
    create?: XOR<TeamCreateWithoutChallengeEntriesInput, TeamUncheckedCreateWithoutChallengeEntriesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutChallengeEntriesInput
    upsert?: TeamUpsertWithoutChallengeEntriesInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutChallengeEntriesInput, TeamUpdateWithoutChallengeEntriesInput>, TeamUncheckedUpdateWithoutChallengeEntriesInput>
  }

  export type ActivityUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<ActivityCreateWithoutParticipantInput, ActivityUncheckedCreateWithoutParticipantInput> | ActivityCreateWithoutParticipantInput[] | ActivityUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutParticipantInput | ActivityCreateOrConnectWithoutParticipantInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutParticipantInput | ActivityUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: ActivityCreateManyParticipantInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutParticipantInput | ActivityUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutParticipantInput | ActivityUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type PostUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<PostCreateWithoutParticipantInput, PostUncheckedCreateWithoutParticipantInput> | PostCreateWithoutParticipantInput[] | PostUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: PostCreateOrConnectWithoutParticipantInput | PostCreateOrConnectWithoutParticipantInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutParticipantInput | PostUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: PostCreateManyParticipantInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutParticipantInput | PostUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: PostUpdateManyWithWhereWithoutParticipantInput | PostUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<ActivityCreateWithoutParticipantInput, ActivityUncheckedCreateWithoutParticipantInput> | ActivityCreateWithoutParticipantInput[] | ActivityUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutParticipantInput | ActivityCreateOrConnectWithoutParticipantInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutParticipantInput | ActivityUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: ActivityCreateManyParticipantInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutParticipantInput | ActivityUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutParticipantInput | ActivityUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutParticipantNestedInput = {
    create?: XOR<PostCreateWithoutParticipantInput, PostUncheckedCreateWithoutParticipantInput> | PostCreateWithoutParticipantInput[] | PostUncheckedCreateWithoutParticipantInput[]
    connectOrCreate?: PostCreateOrConnectWithoutParticipantInput | PostCreateOrConnectWithoutParticipantInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutParticipantInput | PostUpsertWithWhereUniqueWithoutParticipantInput[]
    createMany?: PostCreateManyParticipantInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutParticipantInput | PostUpdateWithWhereUniqueWithoutParticipantInput[]
    updateMany?: PostUpdateManyWithWhereWithoutParticipantInput | PostUpdateManyWithWhereWithoutParticipantInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ChallengeParticipantCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<ChallengeParticipantCreateWithoutActivitiesInput, ChallengeParticipantUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutActivitiesInput
    connect?: ChallengeParticipantWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type ChallengeCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<ChallengeCreateWithoutActivitiesInput, ChallengeUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutActivitiesInput
    connect?: ChallengeWhereUniqueInput
  }

  export type ChallengeParticipantUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<ChallengeParticipantCreateWithoutActivitiesInput, ChallengeParticipantUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutActivitiesInput
    upsert?: ChallengeParticipantUpsertWithoutActivitiesInput
    connect?: ChallengeParticipantWhereUniqueInput
    update?: XOR<XOR<ChallengeParticipantUpdateToOneWithWhereWithoutActivitiesInput, ChallengeParticipantUpdateWithoutActivitiesInput>, ChallengeParticipantUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    upsert?: UserUpsertWithoutActivitiesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivitiesInput, UserUpdateWithoutActivitiesInput>, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type ChallengeUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<ChallengeCreateWithoutActivitiesInput, ChallengeUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutActivitiesInput
    upsert?: ChallengeUpsertWithoutActivitiesInput
    disconnect?: ChallengeWhereInput | boolean
    delete?: ChallengeWhereInput | boolean
    connect?: ChallengeWhereUniqueInput
    update?: XOR<XOR<ChallengeUpdateToOneWithWhereWithoutActivitiesInput, ChallengeUpdateWithoutActivitiesInput>, ChallengeUncheckedUpdateWithoutActivitiesInput>
  }

  export type ChallengeParticipantCreateNestedOneWithoutPostsInput = {
    create?: XOR<ChallengeParticipantCreateWithoutPostsInput, ChallengeParticipantUncheckedCreateWithoutPostsInput>
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutPostsInput
    connect?: ChallengeParticipantWhereUniqueInput
  }

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type ChallengeCreateNestedOneWithoutPostsInput = {
    create?: XOR<ChallengeCreateWithoutPostsInput, ChallengeUncheckedCreateWithoutPostsInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutPostsInput
    connect?: ChallengeWhereUniqueInput
  }

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ChallengeParticipantUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<ChallengeParticipantCreateWithoutPostsInput, ChallengeParticipantUncheckedCreateWithoutPostsInput>
    connectOrCreate?: ChallengeParticipantCreateOrConnectWithoutPostsInput
    upsert?: ChallengeParticipantUpsertWithoutPostsInput
    connect?: ChallengeParticipantWhereUniqueInput
    update?: XOR<XOR<ChallengeParticipantUpdateToOneWithWhereWithoutPostsInput, ChallengeParticipantUpdateWithoutPostsInput>, ChallengeParticipantUncheckedUpdateWithoutPostsInput>
  }

  export type CommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type UserUpdateOneWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type ChallengeUpdateOneWithoutPostsNestedInput = {
    create?: XOR<ChallengeCreateWithoutPostsInput, ChallengeUncheckedCreateWithoutPostsInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutPostsInput
    upsert?: ChallengeUpsertWithoutPostsInput
    disconnect?: ChallengeWhereInput | boolean
    delete?: ChallengeWhereInput | boolean
    connect?: ChallengeWhereUniqueInput
    update?: XOR<XOR<ChallengeUpdateToOneWithWhereWithoutPostsInput, ChallengeUpdateWithoutPostsInput>, ChallengeUncheckedUpdateWithoutPostsInput>
  }

  export type CommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    connect?: PostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    upsert?: PostUpsertWithoutCommentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutCommentsInput, PostUpdateWithoutCommentsInput>, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTeamRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTeamRoleFilter<$PrismaModel> | $Enums.TeamRole
  }

  export type NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TeamRole | EnumTeamRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TeamRole[] | ListEnumTeamRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTeamRoleWithAggregatesFilter<$PrismaModel> | $Enums.TeamRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTeamRoleFilter<$PrismaModel>
    _max?: NestedEnumTeamRoleFilter<$PrismaModel>
  }

  export type NestedEnumChallengeParticipantTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChallengeParticipantType | EnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChallengeParticipantType[] | ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChallengeParticipantType[] | ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChallengeParticipantTypeFilter<$PrismaModel> | $Enums.ChallengeParticipantType
  }

  export type NestedEnumChallengeParticipantTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChallengeParticipantType | EnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChallengeParticipantType[] | ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChallengeParticipantType[] | ListEnumChallengeParticipantTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChallengeParticipantTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChallengeParticipantType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChallengeParticipantTypeFilter<$PrismaModel>
    _max?: NestedEnumChallengeParticipantTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TeamCreateWithoutCreatorInput = {
    id?: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    teamMemberships?: TeamMembershipCreateNestedManyWithoutTeamInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutCreatorInput = {
    id?: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutTeamInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutCreatorInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutCreatorInput, TeamUncheckedCreateWithoutCreatorInput>
  }

  export type TeamCreateManyCreatorInputEnvelope = {
    data: TeamCreateManyCreatorInput | TeamCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type TeamMembershipCreateWithoutUserInput = {
    id?: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
    team: TeamCreateNestedOneWithoutTeamMembershipsInput
  }

  export type TeamMembershipUncheckedCreateWithoutUserInput = {
    id?: string
    teamId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type TeamMembershipCreateOrConnectWithoutUserInput = {
    where: TeamMembershipWhereUniqueInput
    create: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput>
  }

  export type TeamMembershipCreateManyUserInputEnvelope = {
    data: TeamMembershipCreateManyUserInput | TeamMembershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChallengeCreateWithoutCreatorInput = {
    id?: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    participants?: ChallengeParticipantCreateNestedManyWithoutChallengeInput
    activities?: ActivityCreateNestedManyWithoutChallengeInput
    posts?: PostCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutCreatorInput = {
    id?: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    participants?: ChallengeParticipantUncheckedCreateNestedManyWithoutChallengeInput
    activities?: ActivityUncheckedCreateNestedManyWithoutChallengeInput
    posts?: PostUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeCreateOrConnectWithoutCreatorInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutCreatorInput, ChallengeUncheckedCreateWithoutCreatorInput>
  }

  export type ChallengeCreateManyCreatorInputEnvelope = {
    data: ChallengeCreateManyCreatorInput | ChallengeCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type ChallengeParticipantCreateWithoutUserInput = {
    id?: string
    joinedAt?: Date | string
    challenge: ChallengeCreateNestedOneWithoutParticipantsInput
    team?: TeamCreateNestedOneWithoutChallengeEntriesInput
    activities?: ActivityCreateNestedManyWithoutParticipantInput
    posts?: PostCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantUncheckedCreateWithoutUserInput = {
    id?: string
    challengeId: string
    teamId?: string | null
    joinedAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutParticipantInput
    posts?: PostUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantCreateOrConnectWithoutUserInput = {
    where: ChallengeParticipantWhereUniqueInput
    create: XOR<ChallengeParticipantCreateWithoutUserInput, ChallengeParticipantUncheckedCreateWithoutUserInput>
  }

  export type ChallengeParticipantCreateManyUserInputEnvelope = {
    data: ChallengeParticipantCreateManyUserInput | ChallengeParticipantCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityCreateWithoutUserInput = {
    id?: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    participant: ChallengeParticipantCreateNestedOneWithoutActivitiesInput
    Challenge?: ChallengeCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutUserInput = {
    id?: string
    participantId: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    challengeId?: string | null
  }

  export type ActivityCreateOrConnectWithoutUserInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityCreateManyUserInputEnvelope = {
    data: ActivityCreateManyUserInput | ActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutUserInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    participant: ChallengeParticipantCreateNestedOneWithoutPostsInput
    comments?: CommentCreateNestedManyWithoutPostInput
    Challenge?: ChallengeCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutUserInput = {
    id?: string
    participantId: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    challengeId?: string | null
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutUserInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostCreateManyUserInputEnvelope = {
    data: PostCreateManyUserInput | PostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutAuthorInput = {
    id?: string
    content?: string | null
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: string
    postId: string
    content?: string | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentCreateManyAuthorInputEnvelope = {
    data: CommentCreateManyAuthorInput | CommentCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type TeamUpsertWithWhereUniqueWithoutCreatorInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutCreatorInput, TeamUncheckedUpdateWithoutCreatorInput>
    create: XOR<TeamCreateWithoutCreatorInput, TeamUncheckedCreateWithoutCreatorInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutCreatorInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutCreatorInput, TeamUncheckedUpdateWithoutCreatorInput>
  }

  export type TeamUpdateManyWithWhereWithoutCreatorInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutCreatorInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: UuidFilter<"Team"> | string
    creatorId?: UuidFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    avatarUrl?: StringNullableFilter<"Team"> | string | null
    isPublic?: BoolFilter<"Team"> | boolean
    createdAt?: DateTimeFilter<"Team"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Team"> | Date | string | null
  }

  export type TeamMembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: TeamMembershipWhereUniqueInput
    update: XOR<TeamMembershipUpdateWithoutUserInput, TeamMembershipUncheckedUpdateWithoutUserInput>
    create: XOR<TeamMembershipCreateWithoutUserInput, TeamMembershipUncheckedCreateWithoutUserInput>
  }

  export type TeamMembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: TeamMembershipWhereUniqueInput
    data: XOR<TeamMembershipUpdateWithoutUserInput, TeamMembershipUncheckedUpdateWithoutUserInput>
  }

  export type TeamMembershipUpdateManyWithWhereWithoutUserInput = {
    where: TeamMembershipScalarWhereInput
    data: XOR<TeamMembershipUpdateManyMutationInput, TeamMembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type TeamMembershipScalarWhereInput = {
    AND?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
    OR?: TeamMembershipScalarWhereInput[]
    NOT?: TeamMembershipScalarWhereInput | TeamMembershipScalarWhereInput[]
    id?: UuidFilter<"TeamMembership"> | string
    teamId?: UuidFilter<"TeamMembership"> | string
    userId?: UuidFilter<"TeamMembership"> | string
    role?: EnumTeamRoleFilter<"TeamMembership"> | $Enums.TeamRole
    joinedAt?: DateTimeFilter<"TeamMembership"> | Date | string
    expiresAt?: DateTimeNullableFilter<"TeamMembership"> | Date | string | null
  }

  export type ChallengeUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ChallengeWhereUniqueInput
    update: XOR<ChallengeUpdateWithoutCreatorInput, ChallengeUncheckedUpdateWithoutCreatorInput>
    create: XOR<ChallengeCreateWithoutCreatorInput, ChallengeUncheckedCreateWithoutCreatorInput>
  }

  export type ChallengeUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ChallengeWhereUniqueInput
    data: XOR<ChallengeUpdateWithoutCreatorInput, ChallengeUncheckedUpdateWithoutCreatorInput>
  }

  export type ChallengeUpdateManyWithWhereWithoutCreatorInput = {
    where: ChallengeScalarWhereInput
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyWithoutCreatorInput>
  }

  export type ChallengeScalarWhereInput = {
    AND?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
    OR?: ChallengeScalarWhereInput[]
    NOT?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
    id?: UuidFilter<"Challenge"> | string
    creatorId?: UuidFilter<"Challenge"> | string
    title?: StringFilter<"Challenge"> | string
    description?: StringNullableFilter<"Challenge"> | string | null
    challengeType?: EnumChallengeParticipantTypeFilter<"Challenge"> | $Enums.ChallengeParticipantType
    maxParticipants?: IntNullableFilter<"Challenge"> | number | null
    startDate?: DateTimeFilter<"Challenge"> | Date | string
    endDate?: DateTimeFilter<"Challenge"> | Date | string
    isPublic?: BoolFilter<"Challenge"> | boolean
    createdAt?: DateTimeFilter<"Challenge"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Challenge"> | Date | string | null
  }

  export type ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: ChallengeParticipantWhereUniqueInput
    update: XOR<ChallengeParticipantUpdateWithoutUserInput, ChallengeParticipantUncheckedUpdateWithoutUserInput>
    create: XOR<ChallengeParticipantCreateWithoutUserInput, ChallengeParticipantUncheckedCreateWithoutUserInput>
  }

  export type ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: ChallengeParticipantWhereUniqueInput
    data: XOR<ChallengeParticipantUpdateWithoutUserInput, ChallengeParticipantUncheckedUpdateWithoutUserInput>
  }

  export type ChallengeParticipantUpdateManyWithWhereWithoutUserInput = {
    where: ChallengeParticipantScalarWhereInput
    data: XOR<ChallengeParticipantUpdateManyMutationInput, ChallengeParticipantUncheckedUpdateManyWithoutUserInput>
  }

  export type ChallengeParticipantScalarWhereInput = {
    AND?: ChallengeParticipantScalarWhereInput | ChallengeParticipantScalarWhereInput[]
    OR?: ChallengeParticipantScalarWhereInput[]
    NOT?: ChallengeParticipantScalarWhereInput | ChallengeParticipantScalarWhereInput[]
    id?: UuidFilter<"ChallengeParticipant"> | string
    challengeId?: UuidFilter<"ChallengeParticipant"> | string
    userId?: UuidNullableFilter<"ChallengeParticipant"> | string | null
    teamId?: UuidNullableFilter<"ChallengeParticipant"> | string | null
    joinedAt?: DateTimeFilter<"ChallengeParticipant"> | Date | string
  }

  export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
  }

  export type ActivityUpdateManyWithWhereWithoutUserInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: UuidFilter<"Activity"> | string
    participantId?: UuidFilter<"Activity"> | string
    notes?: StringNullableFilter<"Activity"> | string | null
    date?: DateTimeFilter<"Activity"> | Date | string
    uploadedAt?: DateTimeFilter<"Activity"> | Date | string
    userId?: UuidNullableFilter<"Activity"> | string | null
    challengeId?: UuidNullableFilter<"Activity"> | string | null
  }

  export type PostUpsertWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostUpdateWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
  }

  export type PostUpdateManyWithWhereWithoutUserInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutUserInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: UuidFilter<"Post"> | string
    participantId?: UuidFilter<"Post"> | string
    content?: StringNullableFilter<"Post"> | string | null
    imageUrl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    userId?: UuidNullableFilter<"Post"> | string | null
    challengeId?: UuidNullableFilter<"Post"> | string | null
  }

  export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
  }

  export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutAuthorInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: UuidFilter<"Comment"> | string
    authorId?: UuidFilter<"Comment"> | string
    postId?: UuidFilter<"Comment"> | string
    content?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type UserCreateWithoutCreatedTeamsInput = {
    id: string
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutUserInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutCreatedTeamsInput = {
    id: string
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeUncheckedCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutCreatedTeamsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
  }

  export type TeamMembershipCreateWithoutTeamInput = {
    id?: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
    user: UserCreateNestedOneWithoutTeamMembershipsInput
  }

  export type TeamMembershipUncheckedCreateWithoutTeamInput = {
    id?: string
    userId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type TeamMembershipCreateOrConnectWithoutTeamInput = {
    where: TeamMembershipWhereUniqueInput
    create: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput>
  }

  export type TeamMembershipCreateManyTeamInputEnvelope = {
    data: TeamMembershipCreateManyTeamInput | TeamMembershipCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type ChallengeParticipantCreateWithoutTeamInput = {
    id?: string
    joinedAt?: Date | string
    challenge: ChallengeCreateNestedOneWithoutParticipantsInput
    user?: UserCreateNestedOneWithoutChallengeEntriesInput
    activities?: ActivityCreateNestedManyWithoutParticipantInput
    posts?: PostCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantUncheckedCreateWithoutTeamInput = {
    id?: string
    challengeId: string
    userId?: string | null
    joinedAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutParticipantInput
    posts?: PostUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantCreateOrConnectWithoutTeamInput = {
    where: ChallengeParticipantWhereUniqueInput
    create: XOR<ChallengeParticipantCreateWithoutTeamInput, ChallengeParticipantUncheckedCreateWithoutTeamInput>
  }

  export type ChallengeParticipantCreateManyTeamInputEnvelope = {
    data: ChallengeParticipantCreateManyTeamInput | ChallengeParticipantCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedTeamsInput = {
    update: XOR<UserUpdateWithoutCreatedTeamsInput, UserUncheckedUpdateWithoutCreatedTeamsInput>
    create: XOR<UserCreateWithoutCreatedTeamsInput, UserUncheckedCreateWithoutCreatedTeamsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTeamsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTeamsInput, UserUncheckedUpdateWithoutCreatedTeamsInput>
  }

  export type UserUpdateWithoutCreatedTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutUserNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUncheckedUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type TeamMembershipUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamMembershipWhereUniqueInput
    update: XOR<TeamMembershipUpdateWithoutTeamInput, TeamMembershipUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamMembershipCreateWithoutTeamInput, TeamMembershipUncheckedCreateWithoutTeamInput>
  }

  export type TeamMembershipUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamMembershipWhereUniqueInput
    data: XOR<TeamMembershipUpdateWithoutTeamInput, TeamMembershipUncheckedUpdateWithoutTeamInput>
  }

  export type TeamMembershipUpdateManyWithWhereWithoutTeamInput = {
    where: TeamMembershipScalarWhereInput
    data: XOR<TeamMembershipUpdateManyMutationInput, TeamMembershipUncheckedUpdateManyWithoutTeamInput>
  }

  export type ChallengeParticipantUpsertWithWhereUniqueWithoutTeamInput = {
    where: ChallengeParticipantWhereUniqueInput
    update: XOR<ChallengeParticipantUpdateWithoutTeamInput, ChallengeParticipantUncheckedUpdateWithoutTeamInput>
    create: XOR<ChallengeParticipantCreateWithoutTeamInput, ChallengeParticipantUncheckedCreateWithoutTeamInput>
  }

  export type ChallengeParticipantUpdateWithWhereUniqueWithoutTeamInput = {
    where: ChallengeParticipantWhereUniqueInput
    data: XOR<ChallengeParticipantUpdateWithoutTeamInput, ChallengeParticipantUncheckedUpdateWithoutTeamInput>
  }

  export type ChallengeParticipantUpdateManyWithWhereWithoutTeamInput = {
    where: ChallengeParticipantScalarWhereInput
    data: XOR<ChallengeParticipantUpdateManyMutationInput, ChallengeParticipantUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamCreateWithoutTeamMembershipsInput = {
    id?: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedTeamsInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutTeamMembershipsInput = {
    id?: string
    creatorId: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutTeamMembershipsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTeamMembershipsInput, TeamUncheckedCreateWithoutTeamMembershipsInput>
  }

  export type UserCreateWithoutTeamMembershipsInput = {
    id: string
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput
    createdChallenges?: ChallengeCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutUserInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutTeamMembershipsInput = {
    id: string
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput
    createdChallenges?: ChallengeUncheckedCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutTeamMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
  }

  export type TeamUpsertWithoutTeamMembershipsInput = {
    update: XOR<TeamUpdateWithoutTeamMembershipsInput, TeamUncheckedUpdateWithoutTeamMembershipsInput>
    create: XOR<TeamCreateWithoutTeamMembershipsInput, TeamUncheckedCreateWithoutTeamMembershipsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutTeamMembershipsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutTeamMembershipsInput, TeamUncheckedUpdateWithoutTeamMembershipsInput>
  }

  export type TeamUpdateWithoutTeamMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTeamMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type UserUpsertWithoutTeamMembershipsInput = {
    update: XOR<UserUpdateWithoutTeamMembershipsInput, UserUncheckedUpdateWithoutTeamMembershipsInput>
    create: XOR<UserCreateWithoutTeamMembershipsInput, UserUncheckedCreateWithoutTeamMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeamMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeamMembershipsInput, UserUncheckedUpdateWithoutTeamMembershipsInput>
  }

  export type UserUpdateWithoutTeamMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput
    createdChallenges?: ChallengeUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutUserNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutTeamMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput
    createdChallenges?: ChallengeUncheckedUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateWithoutCreatedChallengesInput = {
    id: string
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutUserInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutCreatedChallengesInput = {
    id: string
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutCreatedChallengesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedChallengesInput, UserUncheckedCreateWithoutCreatedChallengesInput>
  }

  export type ChallengeParticipantCreateWithoutChallengeInput = {
    id?: string
    joinedAt?: Date | string
    user?: UserCreateNestedOneWithoutChallengeEntriesInput
    team?: TeamCreateNestedOneWithoutChallengeEntriesInput
    activities?: ActivityCreateNestedManyWithoutParticipantInput
    posts?: PostCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantUncheckedCreateWithoutChallengeInput = {
    id?: string
    userId?: string | null
    teamId?: string | null
    joinedAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutParticipantInput
    posts?: PostUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantCreateOrConnectWithoutChallengeInput = {
    where: ChallengeParticipantWhereUniqueInput
    create: XOR<ChallengeParticipantCreateWithoutChallengeInput, ChallengeParticipantUncheckedCreateWithoutChallengeInput>
  }

  export type ChallengeParticipantCreateManyChallengeInputEnvelope = {
    data: ChallengeParticipantCreateManyChallengeInput | ChallengeParticipantCreateManyChallengeInput[]
    skipDuplicates?: boolean
  }

  export type ActivityCreateWithoutChallengeInput = {
    id?: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    participant: ChallengeParticipantCreateNestedOneWithoutActivitiesInput
    User?: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutChallengeInput = {
    id?: string
    participantId: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    userId?: string | null
  }

  export type ActivityCreateOrConnectWithoutChallengeInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutChallengeInput, ActivityUncheckedCreateWithoutChallengeInput>
  }

  export type ActivityCreateManyChallengeInputEnvelope = {
    data: ActivityCreateManyChallengeInput | ActivityCreateManyChallengeInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutChallengeInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    participant: ChallengeParticipantCreateNestedOneWithoutPostsInput
    comments?: CommentCreateNestedManyWithoutPostInput
    User?: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutChallengeInput = {
    id?: string
    participantId: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    userId?: string | null
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutChallengeInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutChallengeInput, PostUncheckedCreateWithoutChallengeInput>
  }

  export type PostCreateManyChallengeInputEnvelope = {
    data: PostCreateManyChallengeInput | PostCreateManyChallengeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedChallengesInput = {
    update: XOR<UserUpdateWithoutCreatedChallengesInput, UserUncheckedUpdateWithoutCreatedChallengesInput>
    create: XOR<UserCreateWithoutCreatedChallengesInput, UserUncheckedCreateWithoutCreatedChallengesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedChallengesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedChallengesInput, UserUncheckedUpdateWithoutCreatedChallengesInput>
  }

  export type UserUpdateWithoutCreatedChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutUserNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput = {
    where: ChallengeParticipantWhereUniqueInput
    update: XOR<ChallengeParticipantUpdateWithoutChallengeInput, ChallengeParticipantUncheckedUpdateWithoutChallengeInput>
    create: XOR<ChallengeParticipantCreateWithoutChallengeInput, ChallengeParticipantUncheckedCreateWithoutChallengeInput>
  }

  export type ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput = {
    where: ChallengeParticipantWhereUniqueInput
    data: XOR<ChallengeParticipantUpdateWithoutChallengeInput, ChallengeParticipantUncheckedUpdateWithoutChallengeInput>
  }

  export type ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput = {
    where: ChallengeParticipantScalarWhereInput
    data: XOR<ChallengeParticipantUpdateManyMutationInput, ChallengeParticipantUncheckedUpdateManyWithoutChallengeInput>
  }

  export type ActivityUpsertWithWhereUniqueWithoutChallengeInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutChallengeInput, ActivityUncheckedUpdateWithoutChallengeInput>
    create: XOR<ActivityCreateWithoutChallengeInput, ActivityUncheckedCreateWithoutChallengeInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutChallengeInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutChallengeInput, ActivityUncheckedUpdateWithoutChallengeInput>
  }

  export type ActivityUpdateManyWithWhereWithoutChallengeInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutChallengeInput>
  }

  export type PostUpsertWithWhereUniqueWithoutChallengeInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutChallengeInput, PostUncheckedUpdateWithoutChallengeInput>
    create: XOR<PostCreateWithoutChallengeInput, PostUncheckedCreateWithoutChallengeInput>
  }

  export type PostUpdateWithWhereUniqueWithoutChallengeInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutChallengeInput, PostUncheckedUpdateWithoutChallengeInput>
  }

  export type PostUpdateManyWithWhereWithoutChallengeInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutChallengeInput>
  }

  export type ChallengeCreateWithoutParticipantsInput = {
    id?: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedChallengesInput
    activities?: ActivityCreateNestedManyWithoutChallengeInput
    posts?: PostCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutParticipantsInput = {
    id?: string
    creatorId: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutChallengeInput
    posts?: PostUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeCreateOrConnectWithoutParticipantsInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutParticipantsInput, ChallengeUncheckedCreateWithoutParticipantsInput>
  }

  export type UserCreateWithoutChallengeEntriesInput = {
    id: string
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeCreateNestedManyWithoutCreatorInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutChallengeEntriesInput = {
    id: string
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeUncheckedCreateNestedManyWithoutCreatorInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutChallengeEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChallengeEntriesInput, UserUncheckedCreateWithoutChallengeEntriesInput>
  }

  export type TeamCreateWithoutChallengeEntriesInput = {
    id?: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedTeamsInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutChallengeEntriesInput = {
    id?: string
    creatorId: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutChallengeEntriesInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutChallengeEntriesInput, TeamUncheckedCreateWithoutChallengeEntriesInput>
  }

  export type ActivityCreateWithoutParticipantInput = {
    id?: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    User?: UserCreateNestedOneWithoutActivitiesInput
    Challenge?: ChallengeCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutParticipantInput = {
    id?: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    userId?: string | null
    challengeId?: string | null
  }

  export type ActivityCreateOrConnectWithoutParticipantInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutParticipantInput, ActivityUncheckedCreateWithoutParticipantInput>
  }

  export type ActivityCreateManyParticipantInputEnvelope = {
    data: ActivityCreateManyParticipantInput | ActivityCreateManyParticipantInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutParticipantInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    User?: UserCreateNestedOneWithoutPostsInput
    Challenge?: ChallengeCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutParticipantInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    userId?: string | null
    challengeId?: string | null
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutParticipantInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutParticipantInput, PostUncheckedCreateWithoutParticipantInput>
  }

  export type PostCreateManyParticipantInputEnvelope = {
    data: PostCreateManyParticipantInput | PostCreateManyParticipantInput[]
    skipDuplicates?: boolean
  }

  export type ChallengeUpsertWithoutParticipantsInput = {
    update: XOR<ChallengeUpdateWithoutParticipantsInput, ChallengeUncheckedUpdateWithoutParticipantsInput>
    create: XOR<ChallengeCreateWithoutParticipantsInput, ChallengeUncheckedCreateWithoutParticipantsInput>
    where?: ChallengeWhereInput
  }

  export type ChallengeUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: ChallengeWhereInput
    data: XOR<ChallengeUpdateWithoutParticipantsInput, ChallengeUncheckedUpdateWithoutParticipantsInput>
  }

  export type ChallengeUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedChallengesNestedInput
    activities?: ActivityUpdateManyWithoutChallengeNestedInput
    posts?: PostUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activities?: ActivityUncheckedUpdateManyWithoutChallengeNestedInput
    posts?: PostUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type UserUpsertWithoutChallengeEntriesInput = {
    update: XOR<UserUpdateWithoutChallengeEntriesInput, UserUncheckedUpdateWithoutChallengeEntriesInput>
    create: XOR<UserCreateWithoutChallengeEntriesInput, UserUncheckedCreateWithoutChallengeEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChallengeEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChallengeEntriesInput, UserUncheckedUpdateWithoutChallengeEntriesInput>
  }

  export type UserUpdateWithoutChallengeEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUpdateManyWithoutCreatorNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutChallengeEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUncheckedUpdateManyWithoutCreatorNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type TeamUpsertWithoutChallengeEntriesInput = {
    update: XOR<TeamUpdateWithoutChallengeEntriesInput, TeamUncheckedUpdateWithoutChallengeEntriesInput>
    create: XOR<TeamCreateWithoutChallengeEntriesInput, TeamUncheckedCreateWithoutChallengeEntriesInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutChallengeEntriesInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutChallengeEntriesInput, TeamUncheckedUpdateWithoutChallengeEntriesInput>
  }

  export type TeamUpdateWithoutChallengeEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedTeamsNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutChallengeEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type ActivityUpsertWithWhereUniqueWithoutParticipantInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutParticipantInput, ActivityUncheckedUpdateWithoutParticipantInput>
    create: XOR<ActivityCreateWithoutParticipantInput, ActivityUncheckedCreateWithoutParticipantInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutParticipantInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutParticipantInput, ActivityUncheckedUpdateWithoutParticipantInput>
  }

  export type ActivityUpdateManyWithWhereWithoutParticipantInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutParticipantInput>
  }

  export type PostUpsertWithWhereUniqueWithoutParticipantInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutParticipantInput, PostUncheckedUpdateWithoutParticipantInput>
    create: XOR<PostCreateWithoutParticipantInput, PostUncheckedCreateWithoutParticipantInput>
  }

  export type PostUpdateWithWhereUniqueWithoutParticipantInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutParticipantInput, PostUncheckedUpdateWithoutParticipantInput>
  }

  export type PostUpdateManyWithWhereWithoutParticipantInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutParticipantInput>
  }

  export type ChallengeParticipantCreateWithoutActivitiesInput = {
    id?: string
    joinedAt?: Date | string
    challenge: ChallengeCreateNestedOneWithoutParticipantsInput
    user?: UserCreateNestedOneWithoutChallengeEntriesInput
    team?: TeamCreateNestedOneWithoutChallengeEntriesInput
    posts?: PostCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantUncheckedCreateWithoutActivitiesInput = {
    id?: string
    challengeId: string
    userId?: string | null
    teamId?: string | null
    joinedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantCreateOrConnectWithoutActivitiesInput = {
    where: ChallengeParticipantWhereUniqueInput
    create: XOR<ChallengeParticipantCreateWithoutActivitiesInput, ChallengeParticipantUncheckedCreateWithoutActivitiesInput>
  }

  export type UserCreateWithoutActivitiesInput = {
    id: string
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutActivitiesInput = {
    id: string
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeUncheckedCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
  }

  export type ChallengeCreateWithoutActivitiesInput = {
    id?: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedChallengesInput
    participants?: ChallengeParticipantCreateNestedManyWithoutChallengeInput
    posts?: PostCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutActivitiesInput = {
    id?: string
    creatorId: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    participants?: ChallengeParticipantUncheckedCreateNestedManyWithoutChallengeInput
    posts?: PostUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeCreateOrConnectWithoutActivitiesInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutActivitiesInput, ChallengeUncheckedCreateWithoutActivitiesInput>
  }

  export type ChallengeParticipantUpsertWithoutActivitiesInput = {
    update: XOR<ChallengeParticipantUpdateWithoutActivitiesInput, ChallengeParticipantUncheckedUpdateWithoutActivitiesInput>
    create: XOR<ChallengeParticipantCreateWithoutActivitiesInput, ChallengeParticipantUncheckedCreateWithoutActivitiesInput>
    where?: ChallengeParticipantWhereInput
  }

  export type ChallengeParticipantUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: ChallengeParticipantWhereInput
    data: XOR<ChallengeParticipantUpdateWithoutActivitiesInput, ChallengeParticipantUncheckedUpdateWithoutActivitiesInput>
  }

  export type ChallengeParticipantUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenge?: ChallengeUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneWithoutChallengeEntriesNestedInput
    team?: TeamUpdateOneWithoutChallengeEntriesNestedInput
    posts?: PostUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type UserUpsertWithoutActivitiesInput = {
    update: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUncheckedUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ChallengeUpsertWithoutActivitiesInput = {
    update: XOR<ChallengeUpdateWithoutActivitiesInput, ChallengeUncheckedUpdateWithoutActivitiesInput>
    create: XOR<ChallengeCreateWithoutActivitiesInput, ChallengeUncheckedCreateWithoutActivitiesInput>
    where?: ChallengeWhereInput
  }

  export type ChallengeUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: ChallengeWhereInput
    data: XOR<ChallengeUpdateWithoutActivitiesInput, ChallengeUncheckedUpdateWithoutActivitiesInput>
  }

  export type ChallengeUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedChallengesNestedInput
    participants?: ChallengeParticipantUpdateManyWithoutChallengeNestedInput
    posts?: PostUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: ChallengeParticipantUncheckedUpdateManyWithoutChallengeNestedInput
    posts?: PostUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeParticipantCreateWithoutPostsInput = {
    id?: string
    joinedAt?: Date | string
    challenge: ChallengeCreateNestedOneWithoutParticipantsInput
    user?: UserCreateNestedOneWithoutChallengeEntriesInput
    team?: TeamCreateNestedOneWithoutChallengeEntriesInput
    activities?: ActivityCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantUncheckedCreateWithoutPostsInput = {
    id?: string
    challengeId: string
    userId?: string | null
    teamId?: string | null
    joinedAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutParticipantInput
  }

  export type ChallengeParticipantCreateOrConnectWithoutPostsInput = {
    where: ChallengeParticipantWhereUniqueInput
    create: XOR<ChallengeParticipantCreateWithoutPostsInput, ChallengeParticipantUncheckedCreateWithoutPostsInput>
  }

  export type CommentCreateWithoutPostInput = {
    id?: string
    content?: string | null
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutPostInput = {
    id?: string
    authorId: string
    content?: string | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutPostInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentCreateManyPostInputEnvelope = {
    data: CommentCreateManyPostInput | CommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutPostsInput = {
    id: string
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutUserInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id: string
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeUncheckedCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type ChallengeCreateWithoutPostsInput = {
    id?: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedChallengesInput
    participants?: ChallengeParticipantCreateNestedManyWithoutChallengeInput
    activities?: ActivityCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutPostsInput = {
    id?: string
    creatorId: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
    participants?: ChallengeParticipantUncheckedCreateNestedManyWithoutChallengeInput
    activities?: ActivityUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeCreateOrConnectWithoutPostsInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutPostsInput, ChallengeUncheckedCreateWithoutPostsInput>
  }

  export type ChallengeParticipantUpsertWithoutPostsInput = {
    update: XOR<ChallengeParticipantUpdateWithoutPostsInput, ChallengeParticipantUncheckedUpdateWithoutPostsInput>
    create: XOR<ChallengeParticipantCreateWithoutPostsInput, ChallengeParticipantUncheckedCreateWithoutPostsInput>
    where?: ChallengeParticipantWhereInput
  }

  export type ChallengeParticipantUpdateToOneWithWhereWithoutPostsInput = {
    where?: ChallengeParticipantWhereInput
    data: XOR<ChallengeParticipantUpdateWithoutPostsInput, ChallengeParticipantUncheckedUpdateWithoutPostsInput>
  }

  export type ChallengeParticipantUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenge?: ChallengeUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneWithoutChallengeEntriesNestedInput
    team?: TeamUpdateOneWithoutChallengeEntriesNestedInput
    activities?: ActivityUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
  }

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutPostInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutUserNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUncheckedUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ChallengeUpsertWithoutPostsInput = {
    update: XOR<ChallengeUpdateWithoutPostsInput, ChallengeUncheckedUpdateWithoutPostsInput>
    create: XOR<ChallengeCreateWithoutPostsInput, ChallengeUncheckedCreateWithoutPostsInput>
    where?: ChallengeWhereInput
  }

  export type ChallengeUpdateToOneWithWhereWithoutPostsInput = {
    where?: ChallengeWhereInput
    data: XOR<ChallengeUpdateWithoutPostsInput, ChallengeUncheckedUpdateWithoutPostsInput>
  }

  export type ChallengeUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedChallengesNestedInput
    participants?: ChallengeParticipantUpdateManyWithoutChallengeNestedInput
    activities?: ActivityUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: ChallengeParticipantUncheckedUpdateManyWithoutChallengeNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type UserCreateWithoutCommentsInput = {
    id: string
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantCreateNestedManyWithoutUserInput
    activities?: ActivityCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id: string
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput
    teamMemberships?: TeamMembershipUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: ChallengeUncheckedCreateNestedManyWithoutCreatorInput
    challengeEntries?: ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type PostCreateWithoutCommentsInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    participant: ChallengeParticipantCreateNestedOneWithoutPostsInput
    User?: UserCreateNestedOneWithoutPostsInput
    Challenge?: ChallengeCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutCommentsInput = {
    id?: string
    participantId: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    userId?: string | null
    challengeId?: string | null
  }

  export type PostCreateOrConnectWithoutCommentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutUserNestedInput
    activities?: ActivityUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: ChallengeUncheckedUpdateManyWithoutCreatorNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PostUpsertWithoutCommentsInput = {
    update: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: ChallengeParticipantUpdateOneRequiredWithoutPostsNestedInput
    User?: UserUpdateOneWithoutPostsNestedInput
    Challenge?: ChallengeUpdateOneWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TeamCreateManyCreatorInput = {
    id?: string
    name: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type TeamMembershipCreateManyUserInput = {
    id?: string
    teamId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type ChallengeCreateManyCreatorInput = {
    id?: string
    title: string
    description?: string | null
    challengeType?: $Enums.ChallengeParticipantType
    maxParticipants?: number | null
    startDate: Date | string
    endDate: Date | string
    isPublic?: boolean
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type ChallengeParticipantCreateManyUserInput = {
    id?: string
    challengeId: string
    teamId?: string | null
    joinedAt?: Date | string
  }

  export type ActivityCreateManyUserInput = {
    id?: string
    participantId: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    challengeId?: string | null
  }

  export type PostCreateManyUserInput = {
    id?: string
    participantId: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    challengeId?: string | null
  }

  export type CommentCreateManyAuthorInput = {
    id?: string
    postId: string
    content?: string | null
    createdAt?: Date | string
  }

  export type TeamUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teamMemberships?: TeamMembershipUpdateManyWithoutTeamNestedInput
    challengeEntries?: ChallengeParticipantUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teamMemberships?: TeamMembershipUncheckedUpdateManyWithoutTeamNestedInput
    challengeEntries?: ChallengeParticipantUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamMembershipUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    team?: TeamUpdateOneRequiredWithoutTeamMembershipsNestedInput
  }

  export type TeamMembershipUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamMembershipUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChallengeUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: ChallengeParticipantUpdateManyWithoutChallengeNestedInput
    activities?: ActivityUpdateManyWithoutChallengeNestedInput
    posts?: PostUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    participants?: ChallengeParticipantUncheckedUpdateManyWithoutChallengeNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutChallengeNestedInput
    posts?: PostUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: EnumChallengeParticipantTypeFieldUpdateOperationsInput | $Enums.ChallengeParticipantType
    maxParticipants?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChallengeParticipantUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenge?: ChallengeUpdateOneRequiredWithoutParticipantsNestedInput
    team?: TeamUpdateOneWithoutChallengeEntriesNestedInput
    activities?: ActivityUpdateManyWithoutParticipantNestedInput
    posts?: PostUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutParticipantNestedInput
    posts?: PostUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: ChallengeParticipantUpdateOneRequiredWithoutActivitiesNestedInput
    Challenge?: ChallengeUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: ChallengeParticipantUpdateOneRequiredWithoutPostsNestedInput
    comments?: CommentUpdateManyWithoutPostNestedInput
    Challenge?: ChallengeUpdateOneWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMembershipCreateManyTeamInput = {
    id?: string
    userId: string
    role?: $Enums.TeamRole
    joinedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type ChallengeParticipantCreateManyTeamInput = {
    id?: string
    challengeId: string
    userId?: string | null
    joinedAt?: Date | string
  }

  export type TeamMembershipUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTeamMembershipsNestedInput
  }

  export type TeamMembershipUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamMembershipUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTeamRoleFieldUpdateOperationsInput | $Enums.TeamRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChallengeParticipantUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenge?: ChallengeUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneWithoutChallengeEntriesNestedInput
    activities?: ActivityUpdateManyWithoutParticipantNestedInput
    posts?: PostUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutParticipantNestedInput
    posts?: PostUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeParticipantCreateManyChallengeInput = {
    id?: string
    userId?: string | null
    teamId?: string | null
    joinedAt?: Date | string
  }

  export type ActivityCreateManyChallengeInput = {
    id?: string
    participantId: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    userId?: string | null
  }

  export type PostCreateManyChallengeInput = {
    id?: string
    participantId: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    userId?: string | null
  }

  export type ChallengeParticipantUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutChallengeEntriesNestedInput
    team?: TeamUpdateOneWithoutChallengeEntriesNestedInput
    activities?: ActivityUpdateManyWithoutParticipantNestedInput
    posts?: PostUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutParticipantNestedInput
    posts?: PostUncheckedUpdateManyWithoutParticipantNestedInput
  }

  export type ChallengeParticipantUncheckedUpdateManyWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: ChallengeParticipantUpdateOneRequiredWithoutActivitiesNestedInput
    User?: UserUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateManyWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participant?: ChallengeParticipantUpdateOneRequiredWithoutPostsNestedInput
    comments?: CommentUpdateManyWithoutPostNestedInput
    User?: UserUpdateOneWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityCreateManyParticipantInput = {
    id?: string
    notes?: string | null
    date: Date | string
    uploadedAt?: Date | string
    userId?: string | null
    challengeId?: string | null
  }

  export type PostCreateManyParticipantInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    userId?: string | null
    challengeId?: string | null
  }

  export type ActivityUpdateWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneWithoutActivitiesNestedInput
    Challenge?: ChallengeUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateManyWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostUpdateWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    User?: UserUpdateOneWithoutPostsNestedInput
    Challenge?: ChallengeUpdateOneWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutParticipantInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentCreateManyPostInput = {
    id?: string
    authorId: string
    content?: string | null
    createdAt?: Date | string
  }

  export type CommentUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}