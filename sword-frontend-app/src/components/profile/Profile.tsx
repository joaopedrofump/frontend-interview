import React from 'react';
import profilePic from '../../assets/images/profile.png';
import './Profile.css';

const Profile: React.FC = () => {
  const about = `
  I am João Pedro Furriel, a Software Engineer. I also have a Biomedical Engineer Degree and I have worked for 8 years as Healhcare IT Consultant in national and international Health IT projects.
  I have worked mainly on the customer side, managing project phases like Requirement Analysis, Product Functional Specification, User Training, Deployment Support and System Configuration.
  In 2015 I've decided to pursue the dream of being a Software Engineer so I enrolled in Informatics and Computer Engineering at Faculdade de Engenharia da Universidade do Porto, having completed the Master Thesis in the Industry 4.0/IoT area.
  Among my areas of interest are Mobile Development, Web Development, Distributed Systems and Internet of Things.
  `;

  return (
    <section className="main-area">
      <figure className="pic-info">
        <img src={profilePic} alt="profilePic" className="profile-pic" />
        <figcaption>
          <h2 className="name">João Pedro Furriel</h2>
          <p className="profile-info">Age: 35</p>
          <p className="profile-info">Location: Porto</p>
          <p className="profile-info">Occupation: Software Engineer</p>
        </figcaption>
      </figure>
      <div className="about">
        <p>About me:</p>
        <p>{about}</p>
      </div>
    </section>
  );
};

export default Profile;
