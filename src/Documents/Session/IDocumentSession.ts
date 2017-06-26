import {IDocumentSession} from "./IDocumentSession";
import {IDocumentQuery, IDocumentQueryOptions} from "./IDocumentQuery";
import {DocumentConventions, DocumentConstructor} from '../Conventions/DocumentConventions';
import {EntityCallback, EntitiesArrayCallback} from '../../Utility/Callbacks';
import {IRavenObject} from "../../Database/IRavenObject";
import {RequestExecutor} from '../../Http/Request/RequestExecutor';

export interface ISessionOptions {
  database?: string;
  requestExecutor?: RequestExecutor;
}

export interface IDocumentSession {
  numberOfRequestsInSession: number;
  conventions: DocumentConventions;

  create<T extends Object = IRavenObject>(attributesOrDocument?: object | T, documentTypeOrObjectType?: string | DocumentConstructor<T>, nestedObjectTypes?: IRavenObject<DocumentConstructor>): T;
  load<T extends Object = IRavenObject>(keyOrKeys: string, documentTypeOrObjectType?: string | DocumentConstructor<T>, includes?: string[], nestedObjectTypes?: IRavenObject<DocumentConstructor>, callback?: EntityCallback<T>): Promise<T>;
  load<T extends Object = IRavenObject>(keyOrKeys: string[], documentTypeOrObjectType?: string | DocumentConstructor<T>, includes?: string[], nestedObjectTypes?: IRavenObject<DocumentConstructor>, callback?: EntitiesArrayCallback<T>): Promise<T[]>;
  delete<T extends Object = IRavenObject>(keyOrEntity: string, expectedEtag?: number, callback?: EntityCallback<T>): Promise<T>;
  delete<T extends Object = IRavenObject>(keyOrEntity: T, expectedEtag?: number, callback?: EntityCallback<T>): Promise<T>;
  store<T extends Object = IRavenObject>(entity: T, key?: string, etag?: number, callback?: EntityCallback<T>): Promise<T>;
  query<T extends Object = IRavenObject>(options?: IDocumentQueryOptions<T>): IDocumentQuery<T>;
  saveChanges(): Promise<void>;
}