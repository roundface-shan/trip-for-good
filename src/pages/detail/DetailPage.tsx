import React from "react";
import { useParams } from "react-router-dom";

type MetchParams = {
    touristRouteId: string,
    other: string,
}

export const DetailPage: React.FC = () => {
    const params = useParams<MetchParams>();
  return (
    <h1>Details: 旅游路线详情，路线ID为：{params.touristRouteId}{params.other}</h1>
  );
};
