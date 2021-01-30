export const onStart = (data: any, reqType: TRequestType) => {
  //this.numberOfRequests++;

  console.log(`----------REQUEST START - ${reqType} ----------`);

  console.log("Start data: ", data);

  /* if (data) {
          console.log("Start data: ", data);
           for (let prop in data) {
            console.log(
              ` - ${prop} - ${
                typeof data[prop] === "object" || typeof data[prop] === "array"
                  ? JSON.stringify(data[prop])
                  : data[prop]
              }`
            );
          } 
        }
   */
  console.log("------------------------------------------------");
};
export const onError = (err: any, reqType: TRequestType) => {
  console.log(`----------REQUEST ERROR - ${reqType} ----------`);

  console.log(`ERROR - `, err);

  /*   if (err.message) {
          console.log(`MESSAGE - ${err.message}`);
        } else {
          console.log(`ERROR - ${JSON.stringify(err)}`);
        } */

  console.log("------------------------------------------------");

  //this.numberOfRequests--;
};

export const onSuccess = (data: any, reqType: TRequestType) => {
  console.log(`----------REQUEST SUCCESSS - ${reqType} ----------`);

  console.log("Response data: ", data);

  /*  if (data) {
          console.log("Response data: ");
          for (let prop in data) {
            console.log(
              ` - ${prop} - ${
                typeof data[prop] === "object" || typeof data[prop] === "array"
                  ? JSON.stringify(data[prop])
                  : data[prop]
              }`
            );
          }
        } */

  console.log("------------------------------------------------");
};
