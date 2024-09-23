import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TeamSection from "../components/TeamSection";
import "../styles/Home.css";
const Home = () => {
  return (
    <div>
      {/* Section Equipe */}
      <TeamSection />

      {/* Section Tarifs */}
      <div className="container section_offre text-center py-5">
        <h1 className="mb-4">Nos Offres</h1>
        <div className="row">
          {/* Plan 1 */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Plan Basique</h2>
                <p className="card-text">30€/mois</p>
                <p className="card-text">Jusqu'à 10 clients</p>
                <a
                  href="mailto:contact@gymunity.com?subject=Demande%20PLAN%201&body=Bonjour%2C%0D%0AJe%20souhaite%20souscrire%20au%20PLAN%201%20(Basique)%20pour%2030€/mois%20avec%20jusqu'%C3%A0%2010%20clients.%0D%0AMerci."
                  className="btn btn-primary"
                >
                  Choisir ce plan
                </a>
              </div>
            </div>
          </div>

          {/* Plan 2 */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Plan Pro</h2>
                <p className="card-text">55€/mois</p>
                <p className="card-text">Jusqu'à 20 clients</p>
                <a
                  href="mailto:contact@gymunity.com?subject=Demande%20PLAN%202&body=Bonjour%2C%0D%0AJe%20souhaite%20souscrire%20au%20PLAN%202%20(Pro)%20pour%2055€/mois%20avec%20jusqu'%C3%A0%2020%20clients.%0D%0AMerci."
                  className="btn btn-primary"
                >
                  Choisir ce plan
                </a>
              </div>
            </div>
          </div>

          {/* Plan 3 */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Plan Illimité</h2>
                <p className="card-text">80€/mois</p>
                <p className="card-text">Clients illimités</p>
                <a
                  href="mailto:contact@gymunity.com?subject=Demande%20PLAN%203&body=Bonjour%2C%0D%0AJe%20souhaite%20souscrire%20au%20PLAN%203%20(Illimit%C3%A9)%20pour%2080€/mois%20avec%20clients%20illimit%C3%A9s.%0D%0AMerci."
                  className="btn btn-primary"
                >
                  Choisir ce plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
