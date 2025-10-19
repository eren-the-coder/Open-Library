import { createContext, useContext, useState, type ReactNode } from "react";

interface TeachingUnitContextType {
  selectedUnit: string; // on stocke le code de l'unité, ex: "INF111"
  setSelectedUnit: (unit: string) => void;
}

const TeachingUnitContext = createContext<TeachingUnitContextType | undefined>(undefined);

export const TeachingUnitProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>("Tous");

  return (
    <TeachingUnitContext.Provider value={{ selectedUnit, setSelectedUnit }}>
      {children}
    </TeachingUnitContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte facilement
export const useTeachingUnit = () => {
  const context = useContext(TeachingUnitContext);
  if (!context) {
    throw new Error("useTeachingUnit doit être utilisé dans un TeachingUnitProvider");
  }
  return context;
};
