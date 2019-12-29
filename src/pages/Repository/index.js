import React, { useEffect, useState } from "react";

import api from "../../services/api";
// import { Container } from './styles';

export default function Repository({ match }) {
  const [loading, setLoading] = useState(true);
  const [allInfoRepository, setAllInfoRepository] = useState({});
  const [issuesIsRepository, setIssuesIsRepository] = useState([]);
  const [repository] = useState(
    decodeURIComponent(match.params.repositoryName)
  );

  useEffect(() => {
    async function getAllInfoRepository() {
      try {
        const [repositoryInfo, issues] = await Promise.all([
          api.get(`/repos/${repository}`),
          api.get(`/repos/${repository}/issues`, {
            params: {
              state: "open",
              per_page: 7,
            },
          }),
        ]);
        setAllInfoRepository(repositoryInfo.data);
        setIssuesIsRepository(issues.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllInfoRepository();
  }, [repository]);

  return <div>Repository</div>;
}
