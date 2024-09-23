import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importation de Bootstrap
import "../styles/Home.css"; // Importation du fichier CSS

const TeamSection = () => {
  return (
    <div className="text-center py-5 section_qui_sommes_nous">
      <div className="container">
        <h1 className="mb-4 titre_qui_sommes_nous">QUI SOMMES NOUS</h1>
        <h2 className="mb-5">MEET OUR EXPERT TRAINERS</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card card1">
              <img
                src="/public/tom.jpg"
                alt="Tom Desvignes"
                className="card-img-top img-fluid"
                style={{
                  height: "300px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div className="card-body">
                <h3 className="card-title">TOM DESVIGNES</h3>
                <p className="card-text">
                  <strong>Développement Mobile</strong> : développement des
                  fonctionnalités mobiles, optimisation des performances.
                </p>
                <p className="card-text">
                  <strong>Développement Backend</strong> : conception et
                  développement de l'architecture backend, gestion de la base de
                  données.
                </p>
                <p className="card-text">
                  <strong>Gestion de projet</strong> : suivi de l'avancement du
                  projet.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card1">
              <img
                src="/public/nino.jpg"
                alt="Nino Herran"
                className="card-img-top img-fluid"
                style={{
                  height: "300px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div className="card-body">
                <h3 className="card-title">NINO HERRAN</h3>
                <p className="card-text">
                  <strong>Développement Mobile</strong> : Développement des
                  fonctionnalités mobiles, intégration des API backend.
                </p>
                <p className="card-text">
                  <strong>Développement Backend</strong> : Conception et
                  développement de l'architecture backend, intégration des
                  services tiers.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card1">
              <img
                src="/public/adam.jpeg"
                alt="Adam Hocini"
                className="card-img-top img-fluid"
                style={{
                  height: "300px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h3 className="card-title">ADAM HOCINI</h3>
                <p className="card-text">
                  <strong>Gestion de Projet</strong> : Planification,
                  coordination des tâches, suivi de l'avancement du projet.
                </p>
                <p className="card-text">
                  <strong>Designer UI</strong> : Conception et développement des
                  interfaces utilisateur et fonctionnalités de l'application
                  mobile.
                </p>
                <p className="card-text">
                  <strong>Communication</strong> : Gestion des communications
                  avec les parties prenantes et les utilisateurs, collecte de
                  feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
