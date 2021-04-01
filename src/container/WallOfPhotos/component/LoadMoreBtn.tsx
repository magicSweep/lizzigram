import React, { FC } from "react";
import Button from "../../../component/Button";
import classes from "./../WallOfPhotos.module.scss";

const LoadMoreBtn: FC<ILoadMoreBtnProps> = ({
  photos,
  hasNextPage,
  onLoadMore,
  error,
  loading,
}) => {
  if (error || loading) return null;

  if (!photos && !loading) return null;

  if (photos && !hasNextPage) return null;

  return (
    <div className={classes.fetchMore}>
      <Button onClick={onLoadMore} label="Загрузить еще..." />
    </div>
  );
};

export default LoadMoreBtn;
