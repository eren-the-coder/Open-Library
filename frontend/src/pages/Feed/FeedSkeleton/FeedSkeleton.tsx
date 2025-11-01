import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../Feed.module.css';

export default function () {
  return (
    <div className={styles.feed}>
      <Skeleton
        baseColor="#e5e7eb"
        highlightColor="#f8fafc"
        duration={1.4} 
        height={30}
        width="35%"
        borderRadius={8}
        style={{
          marginBottom: "10px",
        }}
      />
      <div
        className={styles.postsContainer}
      >
        {Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)}
      </div>
    </div>
  )
}

function PostSkeleton() {
  return (
    <div style={{
      padding: "10px",
    }}>
      {/* Aperçu du document */}
      <Skeleton
        baseColor="#e5e7eb"
        highlightColor="#f8fafc"
        duration={1.4} 
        height={150}
        width="100%"
        borderRadius={8}
      />

      {/* Titre */}
      <Skeleton
        baseColor="#e5e7eb"
        highlightColor="#f8fafc"
        duration={1.4} 
        width="100%"
        height={20}
        style={{
          marginTop: "20px",
          marginBottom: "10px",
        }}
      />

      {/* Description */}
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f8fafc"
          duration={1.4} 
          count={1}
          height={15}
          width="90%"
        />
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f8fafc"
          duration={1.4}
          count={1}
          height={15}
          width="80%"
        />
    </div>
  );
}

