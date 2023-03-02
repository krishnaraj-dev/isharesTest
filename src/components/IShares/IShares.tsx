import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIsharesRequest } from "../../redux/ishares/actions";
import {
  getErrorSelector,
  getIsharesSelector,
  getPendingSelector,
} from "../../redux/ishares/selectors";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { priceToNumber } from "../../helpers/commonFunctions";
import { IsharesProps } from "../../redux/ishares/types";
import { ISharesTable } from "./ISharesTable";

ChartJS.register(ArcElement, Tooltip, Legend);

export const IShares = () => {
  const [graphData, setGraphata] = useState<any>(null);
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const ishares = useSelector(getIsharesSelector);
  const error = useSelector(getErrorSelector);

  useEffect(() => {
    dispatch(fetchIsharesRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (ishares.length > 0) {
      let data = {
        labels: [] as string[],
        datasets: [
          {
            label: "Asset Value",
            data: [] as number[],
            backgroundColor: ["#64cdd2", "#DDB38F"],
          },
        ],
      };

      const { labels, labelsData } = getGraphData(ishares);
      data.labels = labels;
      data.datasets[0].data = labelsData;
      setGraphata(data);
    }
  }, [ishares]);

  const getGraphData = (shareData: IsharesProps[]) => {
    const labels = [...new Set(shareData.map((item) => item.type))];
    let labelsData = labels.map((item) => {
      const filteredData = shareData.filter((value) =>
        item === value.type ? 1 + value.price : null
      );
      return filteredData.reduce((accumulator, curValue) => {
        return accumulator + priceToNumber(curValue.price) * curValue.quantity;
      }, 0);
    });
    return {
      labelsData,
      labels,
    };
  };

  const totalPortfoliValue = useMemo(() => {
    if (graphData) {
      return graphData.datasets[0].data.reduce(
        (acc: number, curr: number) => acc + curr,
        0
      );
    }
  }, [graphData]);

  return (
    <div className="bg-customGray h-full w-full flex flex-wrap">
      {pending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <div className="w-full md:w-9/12 mb-4 px-3">
            <ISharesTable
              ishares={ishares}
              totalPortfoliValue={totalPortfoliValue}
            />
          </div>
          <div className="w-full md:w-3/12 pt-2 px-3">
            <div className="bg-white rounded-md p-3">
              <div className="flex justify-between items-center pb-3">
                <h2 className="text-lg font-semibold">Portfolio</h2>
                <p className="text-sm">Asset-Value</p>
              </div>
              {graphData ? (
                <Doughnut
                  data={graphData}
                  options={{
                    cutout: 80,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          boxWidth: 15,
                          boxHeight: 15,
                        },
                      },
                    },
                  }}
                />
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
