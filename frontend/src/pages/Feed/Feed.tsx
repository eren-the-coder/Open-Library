import Post from '../../components/Post/Post';
import styles from './Feed.module.css';
import { useState, useEffect } from 'react';
import { useTeachingUnit } from "../../context/TeachingUnitContext";
import EmptyFeedMessage from '../../components/EmptyFeedMessage/EmptyFeedMessage';
import { API_URL } from '../../config';
import FeedSkeleton from './FeedSkeleton/FeedSkeleton';

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
  fileUrl?: string;
}

const Feed = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedUnit } = useTeachingUnit();

  useEffect(() => {
    fetch(`${API_URL}/getPosts.php`)
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

  if (loading) return (
    <FeedSkeleton />
  );

  const filteredPosts = selectedUnit === "Tous" 
  ? resources 
  : resources.filter(post => post.teachingUnit === selectedUnit);

  return (
    <section className={styles.feed}>
      <h1 className={styles.title}>Derniers posts</h1>
      {filteredPosts.length === 0 && <EmptyFeedMessage />}
      <div className={styles.postsContainer}>
        {filteredPosts.map(post => (
          <Post key={post.id}
            title={post.name}
            description={post.description}
            date={post.updatedAt}
            type= {post.type}
            hasDownload={post.type !== "comm_text"}
            hasPreview={post.type !== "comm_text"}
            fileUrl={post.fileUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;