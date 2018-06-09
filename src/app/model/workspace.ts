import { DocumentType } from './document';
import { SpotConfig } from './spot';

export interface Workspace {
  oid: string;
  name: string;
  posOid: string;
  docTypes: DocumentType[];
  spotConfig: SpotConfig;
  workspaceOid?: string;
}
