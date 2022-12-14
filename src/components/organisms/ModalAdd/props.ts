import { ExtNodeAdditionally, IUser } from '../../interfaces';

export interface ModalProps {
  modal: boolean;
  close: () => void;
  user?: IUser;
  node?: ExtNodeAdditionally;
  addUser: (role: string, id: string, user: {}, successCallback: any) => void;
  getTree: () => void;
  editUser: (data: any, successCallback?: any) => void
}
