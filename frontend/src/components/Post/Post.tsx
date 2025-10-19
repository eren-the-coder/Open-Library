import styles from './Post.module.css';
import { FaDownload } from 'react-icons/fa';
import { HiMiniCalendarDateRange } from 'react-icons/hi2';

interface PostProps {
  title: string;
  description: string;
  date: string;
  type: any;
  hasPreview: boolean;
  hasDownload: boolean;
  fileUrl?: string;
}

const Post = ({ title, description, date, type, hasPreview, hasDownload, fileUrl }: PostProps) => {
  // const handleDownload = () => {
  //   console.log('Téléchargement du document:', title);
  // };

  const handleDownload = () => {
    if (!fileUrl) {
      alert("Aucun fichier disponible pour ce post.");
      return;
    }

    const downloadUrl = `http://127.0.0.1/backend/api/download.php?file=${encodeURIComponent(fileUrl.split('/').pop() || '')}`;

    // Ouvre le lien directement dans le navigateur (téléchargement auto)
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeColor = (type: string) => {
    const colors: any = {
      'comm_text': styles.typeCommunique,
      'comm_doc': styles.typeCommuniqueDoc,
      'exam': styles.typeSujetExamen,
      'cours': styles.typeCours,
      'td': styles.typeTD,
      'tp': styles.typeTP,
    };
    return colors[type] || styles.typeDefault;
  };

  const getTypeName = (type: string) => {
    const names: any = {
      'comm_text': 'Communiqué',
      'comm_doc': 'Communiqué',
      'exam': 'Sujet d\'examen',
      'cours': 'Cours',
      'td': 'TD',
      'tp': 'TP',
    };
    return names[type];
  }

  return (
    <article className={styles.post}>
      {hasPreview && (
        <div className={styles.preview}>Aperçu PDF</div>
      )}
      <div className={styles.typeBadge}>
        <span className={`${styles.type} ${getTypeColor(type)}`}>
          {getTypeName(type)}
        </span>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.metadatas}>
          <div className="bubbles">
            <span className={`${styles.bubble} ${styles.bubbleDate}`}>
              <HiMiniCalendarDateRange size={24} color="#1d4ed8"
                style={{
                  marginRight: "5px",
                }}
              />
              {date}
            </span>
          </div>
          {hasDownload && (
            <div className={styles.actions}>
              <button className={`btn ${styles.downloadBtn}`} onClick={handleDownload}>
                <FaDownload size={15} color="#fff" style={{
                  marginRight: "5px",
                }} />
                Télécharger
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;