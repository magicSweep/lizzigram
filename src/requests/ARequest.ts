import {
  onStart as onStartLog,
  onError as onErrorLog,
  onSuccess as onSuccessLog,
} from "./logger";

abstract class ARequest<TReqData, TResData>
  implements IRequest<TReqData, TResData> {
  type: TRequestType = "ABSTRACT";
  reqData: TReqData | undefined;
  //signal: AbortSignal;
  abortController: AbortController;
  // can we send multiple requests or single one
  //isMultiple: boolean;
  //isLog: boolean;
  protected onStartFuncs: TOnStart<TReqData>[] = [];
  protected onSuccessFuncs: TOnSuccess<TResData>[] = [];
  protected onErrorFuncs: TOnError[] = [];

  constructor(isLog: boolean) {
    this.abortController = new AbortController();
    //this.signal = signal;
    //this.isMultiple = isMultiple;
    //this.isLog = isLog;
    if (isLog) {
      this.onStartFuncs = [
        (data) => {
          onStartLog(data, this.type);
        },
      ];
      this.onSuccessFuncs = [
        (data) => {
          onSuccessLog(data, this.type);
        },
      ];
      this.onErrorFuncs = [
        (err) => {
          onErrorLog(err, this.type);
        },
      ];
    }
  }

  fetch = async (data: TReqData) => {
    this.reqData = data;

    this.onStart(data);

    try {
      const res = await this.request(data);

      this.onSuccess(res);
    } catch (err) {
      this.onError(err);
    }
  };

  fetchSync = async (data: TReqData): Promise<TResData> => {
    //console.log("----------START FETCH SYNC", this.type);

    this.reqData = data;

    try {
      this.onStart(data);

      const res = await this.request(data);

      this.onSuccess(res);

      return res;
    } catch (err) {
      this.onError(err);

      throw err;
    }
  };

  onStart = (data: TReqData) => {
    if (this.onStartFuncs.length === 0) return;

    for (let onStart of this.onStartFuncs) {
      onStart(data);
    }
  };
  onError = (err: any) => {
    if (this.onErrorFuncs.length === 0) return;

    for (let onError of this.onErrorFuncs) {
      onError(err);
    }
  };
  onSuccess = (data: TResData) => {
    if (this.onSuccessFuncs.length === 0) return;

    for (let onSuccess of this.onSuccessFuncs) {
      onSuccess(data);
    }
  };

  addOnStart = (onStart: TOnStart<TReqData>) => {
    this.onStartFuncs.push(onStart);
  };
  addOnSuccess = (onSuccess: TOnSuccess<TResData>) => {
    this.onSuccessFuncs.push(onSuccess);
  };
  addOnError = (onError: TOnError) => {
    this.onErrorFuncs.push(onError);
  };

  /*  iOnStart() {
      ARequest.requests[this.type] = ARequest.requests[this.type] + 1;
  
      if (this.isLog) onStartLog(this.data, this.type);
  
      if (this.onStart) this.onStart();
    }
  
    iOnSuccess(data: TResData) {
      ARequest.requests[this.type] = ARequest.requests[this.type] - 1;
  
      if (this.isLog) onSuccessLog(data, this.type);
  
      if (this.onSuccess) this.onSuccess(data);
    }
  
    iOnError(err: any) {
      ARequest.requests[this.type] = ARequest.requests[this.type] - 1;
  
      if (this.isLog) onErrorLog(err, this.type);
  
      if (this.onError) this.onError(err);
    } */

  abstract request: (data: TReqData) => Promise<TResData>;
  //abstract cancel: () => void;

  cancel = () => {
    this.abortController.abort();
  };
}

export default ARequest;
