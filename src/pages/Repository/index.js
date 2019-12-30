import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

import Container from "../../components/Container";
import api from "../../services/api";
import { Loading, Owner, IssueList } from "./styles";

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

  if (loading) {
    return (
      <Loading>
        caregando
        <FaSpinner color="#FFF" fontSize={24} style={{ marginLeft: 22 }} />
      </Loading>
    );
  }
  return (
    <Container>
      <Owner>
        <img
          src={allInfoRepository.owner.avatar_url}
          alt={allInfoRepository.owner.login}
        />
        <h1>{allInfoRepository.name}</h1>
        <p>{allInfoRepository.description}</p>
      </Owner>
      <IssueList>
        {issuesIsRepository.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
    </Container>
  );
}
