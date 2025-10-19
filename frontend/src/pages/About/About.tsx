import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.about}>
      <h1 className={styles.title}>À propos d’Info Open Library</h1>

      <div className={styles.content}>
        <p>
          <strong>Info Open Library</strong> est une plateforme collaborative conçue pour les étudiants
          de la filière <strong>Informatique</strong> de l’Université de Yaoundé I (UY1).
          Elle permet à chacun d’<strong>uploader</strong>, de <strong>partager</strong> et de <strong>consulter</strong> 
          facilement les ressources de formation : cours, TD, TP, résumés, anciens examens, et bien plus encore.
        </p>

        <p>
          Grâce à la contribution de tous, cette initiative devient une véritable 
          <strong> bibliothèque numérique ouverte</strong>, accessible à l’ensemble de la communauté 
          informatique de l’UY1.
        </p>

        <h2 className={styles.subtitle}>🎯 Pourquoi cette plateforme ?</h2>

        <p>
          Dans les groupes WhatsApp de la filière, beaucoup de documents utiles sont partagés.
          Cependant, la quantité importante de messages rend leur recherche difficile — 
          certains fichiers se perdent ou passent inaperçus.
        </p>

        <p>
          <strong>Info Open Library</strong> apporte une solution simple et durable en offrant :
        </p>

        <ul className={styles.list}>
          <li>• Un <strong>espace centralisé</strong> pour tous les documents de la filière</li>
          <li>• Une <strong>recherche rapide</strong> par unité d’enseignement (UE)</li>
          <li>• Une <strong>organisation claire</strong> des ressources par type (cours, TD, TP, examens…)</li>
          <li>• Une <strong>collaboration ouverte</strong> entre étudiants pour enrichir continuellement la bibliothèque</li>
        </ul>

        <p className={styles.closing}>
          En somme, <strong>Info Open Library</strong> vise à faciliter l’accès au savoir 
          et à renforcer la solidarité entre étudiants en informatique.
        </p>
      </div>
    </section>
  );
};

export default About;
