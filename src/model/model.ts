export interface mess {
    userId: string,
    text: string,
    senderName: string,
    // createdAt: firestore.FieldValue.serverTimestamp(),
    createdAt: any,
  }
  export interface SelectModel {
    userName: string;
    id: string;
    lastmesage?: any;
    photo?: string;
  }