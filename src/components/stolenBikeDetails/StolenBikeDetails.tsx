import React from 'react';
import { withRouter } from "react-router";
import axios from 'axios';

const ROOT_URL = "https://bikewise.org/api/v2";

async function getIncidentById(queryData: any, id: string) {
  const response = await axios.get(`${ROOT_URL}/incidents/${id}`,
    {
      params: queryData
    }
  );
  return response;
}

function StolenBikeDetails(props: any) {
  const id = props.match.params.id;

  return (
    <div>
      id = {id}
    </div>
  );
}

export default withRouter(StolenBikeDetails);
