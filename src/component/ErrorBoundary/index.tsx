import React from "react";
import Alert from "../Alert/Alert";
import Portal from "../Portal";
import classes from "./ErrorBoundary.module.scss";
//import { Typography } from "@material-ui/core";
//import MaterialLink from "@material-ui/core/Link";

//import Button from '../UI/Button/Button';

/* interface ErrorBoundaryProps  {
    
} */

class ErrorBoundary extends React.Component {
  state: { hasError: boolean; error?: Error } = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log("ERROR_BOUNDARY", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <Portal type="modal">
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <h5 className={classes.title}>Какая-то ошибочка...</h5>
              <ul>
                <li>
                  <p>- Проверьте интернет соединение.</p>
                </li>
                {/* <li>
                      Попробуйте 
                      <Button 
                        label={"еще раз."} 
                        type={"CONTAINED"}
                        onClick={() => this.setState({hasError: false})}
                        ariaLabel={"Перезагрузить страницу."}
                      />
                    </li> */}
                <li>
                  <p>- Попробуйте перезагрузить страницу.</p>
                </li>

                {/*  <li>
              <Typography color="textSecondary">
                <MaterialLink href="/">- На главную страницу.</MaterialLink>
              </Typography>
            </li> */}
              </ul>
            </div>
          </div>
        </Portal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
