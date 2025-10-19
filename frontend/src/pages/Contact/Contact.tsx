import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <section className={styles.contact}>
      <h1 className={styles.title}>Contact</h1>

      <div className={styles.content}>
        <p>
          Une question, une suggestion ou un problème sur la plateforme ?  
          N’hésite pas à me contacter directement via les moyens suivants :
        </p>

        <ul className={styles.list}>
          <li>
            💬 <strong>WhatsApp :</strong>{" "}
            <a
              href="https://wa.me/237680582926"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              +237 680 58 29 26
            </a>
          </li>
          <li>
            📧 <strong>Email :</strong>{" "}
            <a
              href="mailto:jeanpc568@gmail.com"
              className={styles.link}
            >
              jeanpc568@gmail.com
            </a>
          </li>
        </ul>

        <p className={styles.note}>
          Tu peux aussi utiliser ces canaux pour proposer des idées d’amélioration ou signaler un bug.
        </p>
      </div>
    </section>
  );
};

export default Contact;
