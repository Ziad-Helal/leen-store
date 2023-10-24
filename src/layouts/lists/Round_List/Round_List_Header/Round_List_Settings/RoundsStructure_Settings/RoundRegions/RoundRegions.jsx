import { useSelector } from "react-redux";
import { Badge } from "../../../../../../../components";
import { sortAlphabetically } from "../../../../../../../lib/utils";

export default function RoundRegions({ roundName }) {
  const roundsStructure = useSelector((state) => state.round.roundsStructure);
  const validRegions = Object.keys(
    useSelector((state) => state.clients.geoClients)
  );

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {sortAlphabetically(roundsStructure[roundName]).map((region) => (
        <Badge
          key={region}
          className={`${validRegions.includes(region) || "bg-primary_800"}`}
          round={roundName}
          allowRemovingAction
        >
          {region}
        </Badge>
      ))}
    </div>
  );
}
