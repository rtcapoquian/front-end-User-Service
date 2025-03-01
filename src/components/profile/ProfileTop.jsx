import React from 'react';

const ProfileTop = (
    { 
        profile: { status, company, location, website, social, user: { name, avatar 
        } } }) => {
  return (
    <div className="content-profile-page">
      <div className="profile-user-page card">
        <div className="img-user-profile">
       
          <img className="avatar" src={avatar} alt={name} />
        </div>
        <div className="user-profile-data">
          <h1>{name}</h1>
          <p>
            {status} {company && <span> at {company}</span>}
          </p>
          <p>{location && <span>{location}</span>}</p>
        </div>
        <div className="icons my-1">
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x" />
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x" />
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x" />
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x" />
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x" />
            </a>
          )}
          {social && social.instagram && (
            <a href={social.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
