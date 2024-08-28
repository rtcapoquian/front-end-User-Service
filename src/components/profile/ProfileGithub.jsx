import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";

const ProfileGithub = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await api.get(`/api/profile/github/${username}`);
        if (res.data.length === 0) {
          setError("No repositories found.");
        } else {
          setRepos(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching GitHub repositories.");
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : repos.length > 0 ? (
        repos.map((repo) => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
              <div>
                <span className="badge badge-primary">{repo.language}</span>
                <span className="badge badge-dark">
                  Stars: {repo.stargazers_count}
                </span>
                <span className="badge badge-light">
                  Forks: {repo.forks_count}
                </span>
                <span className="badge badge-info">
                  Watchers: {repo.watchers_count}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No repositories to display.</p>
      )}
    </div>
  );
};

export default ProfileGithub;
