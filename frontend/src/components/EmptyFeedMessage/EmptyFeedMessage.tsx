import { useTeachingUnit } from "../../context/TeachingUnitContext";
import styles from "./EmptyFeedMessage.module.css";

const EmptyFeedMessage = () => {
  const { selectedUnit } = useTeachingUnit();

  return (
    <div className={styles.emptyMessage}>
      <p>
        <strong>Unité sélectionnée :</strong>{" "}
        <span className={styles.unitName}>{selectedUnit}</span>
      </p>
      <p>Aucune ressource pour l’instant.</p>
    </div>
  );
};

export default EmptyFeedMessage;
