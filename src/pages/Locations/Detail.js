import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableDetail from "../../components/LocationDetail/TableDetail";
import TableToolbar from "../../components/Locations/TableToolbar";

var fdg = {
  locID: "97fd57ea-1c64-4883-9c67-e572e2a17974",
  locCode: "P63B01F01",
  locName: "GD PROJ MOTOROLA LANTAI I",
  locType: "Floor (FL)",
  locLatitude: 0,
  locLongitude: 0,

  locDispensation: 0,
  Status: true,
  locCreatedAt: "2021-11-30T18:11:46.000Z",
  locUpdatedAt: "2021-11-30T18:11:46.000Z",
  locUpdatedUsr: "xxxxx",
};
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString()
  );
};

const DetailLocation = () => {
  const [detailData, setDetailData] = useState({});

  const { locID } = useParams();

  useEffect(() => {
    fetch("https://test-api.seucom.com/api/locations/" + locID, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   title: trimmedTitle,
      // }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.code === 200) {
          setDetailData(resData.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [locID]);

  return (
    <Fragment>
      <section>
        <TableToolbar
          label={detailData.locTypeLabel ? detailData.locTypeLabel : ""}
          actionButton={false}
        />
        <TableDetail
          locID={detailData.locID}
          locDispensation={detailData.locDispensation}
          locCode={detailData.locCode}
          locActiveLabel={detailData.locActiveLabel}
          locActive={detailData.locActive}
          locName={detailData.locName}
          locCreatedAt={formatDateTime(detailData.locCreatedAt)}
          locTypeLabel={detailData.locTypeLabel}
          locType={detailData.locType}
          locUpdatedAt={formatDateTime(detailData.locUpdatedAt)}
          locLatitude={detailData.locLatitude}
          locUpdatedUsr={detailData.locUpdatedUsr}
          locLongitude={detailData.locLongitude}
        />
      </section>
      {detailData.floor && (
        <section>
          <TableToolbar label="Floor" actionButton={false} />
          <TableDetail
            locID={detailData.floor.locID}
            locDispensation={detailData.floor.locDispensation}
            locCode={detailData.floor.locCode}
            locActiveLabel=""
            locActive={detailData.floor.locActive}
            locName={detailData.floor.locName}
            locCreatedAt={formatDateTime(detailData.floor.locCreatedAt)}
            locTypeLabel=""
            locType={detailData.floor.locType}
            locUpdatedAt={formatDateTime(detailData.floor.locUpdatedAt)}
            locLatitude={detailData.floor.locLatitude}
            locUpdatedUsr={detailData.floor.locUpdatedUsr}
            locLongitude={detailData.floor.locLongitude}
          />
        </section>
      )}
      {detailData.building && (
        <section>
          <TableToolbar label="Building" actionButton={false} />
          <TableDetail
            locID={detailData.building.locID}
            locDispensation={detailData.building.locDispensation}
            locCode={detailData.building.locCode}
            locActiveLabel=""
            locActive={detailData.building.locActive}
            locName={detailData.building.locName}
            locCreatedAt={formatDateTime(detailData.building.locCreatedAt)}
            locTypeLabel=""
            locType={detailData.building.locType}
            locUpdatedAt={formatDateTime(detailData.building.locUpdatedAt)}
            locLatitude={detailData.building.locLatitude}
            locUpdatedUsr={detailData.building.locUpdatedUsr}
            locLongitude={detailData.building.locLongitude}
          />
        </section>
      )}
      {detailData.project && (
        <section>
          <TableToolbar label="Project" actionButton={false} />
          <TableDetail
            locID={detailData.project.locID}
            locDispensation={detailData.project.locDispensation}
            locCode={detailData.project.locCode}
            locActiveLabel=""
            locActive={detailData.project.locActive}
            locName={detailData.project.locName}
            locCreatedAt={formatDateTime(detailData.project.locCreatedAt)}
            locTypeLabel=""
            locType={detailData.project.locType}
            locUpdatedAt={formatDateTime(detailData.project.locUpdatedAt)}
            locLatitude={detailData.project.locLatitude}
            locUpdatedUsr={detailData.project.locUpdatedUsr}
            locLongitude={detailData.project.locLongitude}
          />
        </section>
      )}
    </Fragment>
  );
};

export default DetailLocation;
