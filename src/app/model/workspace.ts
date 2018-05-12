import { DocumentType } from './document';

export interface Workspace {
  oid: string;
  name: string;
  posOid: string;
  docTypes: DocumentType[];
}
