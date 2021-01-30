import { MutableRefObject, useRef } from "react";
import { start as iStart, syncStart as iSyncStart } from "./controller";

/* If we wanna send many requests and track to them we must create requestsRef: [{id: string, abort: AbortController}] */

/* With this realization we make only one request per component, when component make request we freeze it with loading. */
/* To do another request we must close component and open new with new useRequest */
export const useRequest = <TRequestData, TResponseData>(
  type: TRequestType,
  isSingle: boolean,
  isLog: boolean = true
) => {
  const abortControllerRef: MutableRefObject<
    AbortController | undefined
  > = useRef(undefined);

  /* if (abortControllerRef.current === undefined)
    abortControllerRef.current = new AbortController(); */

  const syncStart = (
    data: TRequestData,
    request: (data: TRequestData, signal: AbortSignal) => Promise<TResponseData>
  ) => {
    abortControllerRef.current = new AbortController();

    return iSyncStart(
      type,
      isLog,
      abortControllerRef.current.signal,
      data,
      request
    );
  };

  const start = (
    data: TRequestData,
    request: (
      data: TRequestData,
      signal: AbortSignal
    ) => Promise<TResponseData>,
    onStart?: any,
    onError?: any,
    onSuccess?: any
  ) => {
    abortControllerRef.current = new AbortController();

    iStart(
      type,
      isSingle,
      isLog,
      abortControllerRef.current.signal,
      data,
      request,
      onStart,
      onError,
      onSuccess
    );
  };

  const cancel = () => {
    if (abortControllerRef.current === undefined)
      throw new Error("No AbortController");

    abortControllerRef.current.abort();
  };

  return {
    start,
    syncStart,
    cancel,
  };
};
