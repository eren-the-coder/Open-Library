import Post from '../../components/Post/Post';
import styles from './Feed.module.css';
import { useState, useEffect } from 'react';

interface Resource {
  id: number;
  name: string;
  description: string;
  type: string;
  teachingUnit: string;
  authorId: string | null;
  file: string | null;
  createdAt: string;
  updatedAt: string;
  validated: number;
  views: number;
  downloads: number;
}

const Feed = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remplacer l'URL si ton serveur PHP est sur un autre port ou domaine
    fetch("http://127.0.0.1/backend/api/getPosts.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResources(data.data);
        } else {
          console.error("Erreur backend :", data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <section className={styles.feed}>
      <h1 className={styles.title}>Derniers posts</h1>
      <div className={styles.postsContainer}>
      {resources.length === 0 && <p>Aucune ressource pour l’instant.</p>}
        {resources.map(post => (
          <Post key={post.id}
            title={post.name}
            description={post.description}
            date={post.updatedAt}
            type= {post.type}
            hasDownload={post.type !== "comm_text"}
            hasPreview={post.type !== "comm_text"}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;