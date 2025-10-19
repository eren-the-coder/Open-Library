import { useEffect, useState } from "react";
import styles from './TeachingUnits.module.css';
import { BsArrowRightShort } from 'react-icons/bs';
import { useTeachingUnit } from "../../context/TeachingUnitContext";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

interface Unit {
  id: number;
  code: string;
  name: string;
  semester: number;
}

const TeachingUnits = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedUnit, setSelectedUnit } = useTeachingUnit();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await fetch("http://127.0.0.1/backend/api/getTeachingUnits.php");
        const data = await res.json();
        if (data.success) {
          setUnits(data.units);
        } else {
          console.error("Erreur backend :", data.error);
        }
      } catch (err) {
        console.error("Erreur fetch :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUnits();
  }, []);

  if (loading) return <LoadingIndicator message='Chargement des UE...' />;


  const handleUnitClick = (unit: Unit | "Tous") => {
    if (unit === "Tous") {
      setSelectedUnit("Tous");
    } else {
      setSelectedUnit(unit.code);
    }
    console.log('Unité sélectionnée:', unit);
    navigate("/");
  };

  return (
    <section className={styles.teachingUnits}>
      <h2 className={styles.title}>Unités d'enseignement</h2>
      <div className={styles.list}>
        <div 
          className={`${styles.unitRow}
            ${"Tous" === selectedUnit ? styles.unitRowActive : ''}
          `}
          onClick={() => handleUnitClick("Tous")}
        >
          <div><span className={styles.dot}>•</span>Tous</div>
          <BsArrowRightShort size={25} color='#6366f1' />
        </div>
        {units.map((unit) => (
          <div 
            key={unit.id}
            className={`${styles.unitRow}
              ${unit.code === selectedUnit ? styles.unitRowActive : ''}
            `}
            onClick={() => handleUnitClick(unit)}
          >
            <div><span className={styles.dot}>•</span>{unit.code} - {unit.name}</div>
            <BsArrowRightShort size={25} color='#6366f1' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeachingUnits;
