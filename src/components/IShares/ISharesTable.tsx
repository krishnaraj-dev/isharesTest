import { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { AppConfig } from "../../config/config";
import {
  currencyFormat,
  getMarketValue,
  priceToNumber,
} from "../../helpers/commonFunctions";
import { IsharesProps } from "../../redux/ishares/types";
import { ModalComponent } from "../Modal";

import avgIcon from "../../public/icons/avg.png";
import investedIcon from "../../public/icons/invest.png";
import quantityIcon from "../../public/icons/quantity.png";
import isharesLogo from "../../public/icons/IShares_by_BlackRock_Logo.png";

interface ISharesTableProps {
  ishares: IsharesProps[];
  totalPortfoliValue: number;
}

export const ISharesTable = ({
  ishares,
  totalPortfoliValue,
}: ISharesTableProps) => {
  console.log(totalPortfoliValue, "total");
  const [show, setShow] = useState(false);
  const [modalAction, setModalAction] = useState<any>(null);

  const handleClose = () => {
    setModalAction(null);
    setShow(false);
  };

  const handleShow = (action: String) => {
    setModalAction(action);
    setShow(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full ishare-table table-auto">
        <tbody>
          {ishares.map((item) => {
            const InvestedPrice = item.quantity * priceToNumber(item.avgCost);
            const PL =
              getMarketValue(item.price, item.quantity) - InvestedPrice;
            const returnPrice = Number((PL / InvestedPrice) * 100);
            const portfolioValue =
              (getMarketValue(item.price, item.quantity) / totalPortfoliValue) *
              100;

            return (
              <tr key={item.id} className="rounded-md bg-white my-2 px-2 flex">
                <td className="w-[21%] min-w-[200px]">
                  <div className="bg-customGraylight w-full h-full">
                    <div className="flex w-full h-full items-center px-3">
                      <span className="text-[22px] text-[#c3c3c3]">
                        {AppConfig.currencySymbol}
                      </span>
                      <span className="text-customBlue text-[32px] font-bold">
                        {priceToNumber(item.price).toFixed(1)}
                      </span>
                      <div className="text-[20px] font-bold pl-5">
                        <img src={isharesLogo} alt="ishares" className="mb-2" />
                        {item.scrip}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="w-[24%] min-w-[270px]">
                  <div className="bg-customGraylight w-full h-full flex items-center">
                    <ul className="custom-width">
                      <li>
                        <span>
                          <img src={quantityIcon} alt="Quantity" />
                          Quantity
                        </span>
                        <span className="font-semibold">{item.quantity}</span>
                      </li>
                      <li>
                        <span>
                          <img src={avgIcon} alt="AvgCost" /> Avg.Cost
                        </span>
                        <span className="font-semibold">{item.avgCost}</span>
                      </li>
                      <li>
                        <span>
                          {" "}
                          <img src={investedIcon} alt="Invested" />
                          Invested Amt
                        </span>
                        <span className="font-semibold">
                          {currencyFormat(AppConfig.currency, InvestedPrice)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="w-[24%] min-w-[250px]">
                  <div className="bg-customGraylight w-full h-full flex items-center">
                    <ul className="between">
                      <li className="font-semibold">
                        <span>Market Value</span>
                        <span>
                          {currencyFormat(
                            AppConfig.currency,
                            getMarketValue(item.price, item.quantity)
                          )}
                        </span>
                      </li>
                      <li>
                        <span>% of Portfolio Value</span>
                        <span className="font-semibold">
                          {portfolioValue.toFixed(2)}%
                        </span>
                      </li>
                      <li>
                        <ProgressBar className="w-full h-2 mt-2">
                          <ProgressBar
                            className={
                              Math.sign(portfolioValue) === -1
                                ? "bg-customRed h-2"
                                : "bg-customGreen h-2"
                            }
                            now={Number(
                              String(portfolioValue).replace(/[-%]/g, "")
                            )}
                            max={100}
                          />
                        </ProgressBar>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="w-[24%] min-w-[250px]">
                  <div className="bg-customGraylight w-full h-full flex items-center">
                    <ul className="between">
                      <li className="font-semibold">
                        <span>Unrealized P&L</span>
                        <span>{currencyFormat(AppConfig.currency, PL)}</span>
                      </li>
                      <li>
                        <span>% Return</span>
                        <div className="flex items-center gap-1">
                          <span
                            className={
                              Math.sign(returnPrice) === -1
                                ? "w-[10px] rotate-180 fill-customRed"
                                : returnPrice === 0
                                ? "hide"
                                : "w-[10px] fill-customGreen"
                            }
                          >
                            {getIcon("upArrow")}
                          </span>
                          <span className="font-semibold">
                            {returnPrice.toFixed(2)}%
                          </span>
                        </div>
                      </li>
                      <li>
                        <ProgressBar className="w-full h-2 mt-2 splitBar">
                          <ProgressBar
                            now={
                              Math.sign(returnPrice) === -1
                                ? 100 - returnPrice * -1
                                : 100
                            }
                            max={200}
                          />
                          <ProgressBar
                            className={
                              Math.sign(returnPrice) === -1
                                ? "bg-customRed h-2"
                                : "bg-customGreen h-2"
                            }
                            now={
                              Math.sign(returnPrice) === -1
                                ? returnPrice * -1
                                : returnPrice
                            }
                            max={200}
                          />
                        </ProgressBar>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="w-[7%] min-w-[70px] flex-wrap">
                  <div
                    className="w-full border-x border-y border-customRed text-center text-customRed
                        font-semibold text-lg rounded-md self-center cursor-pointer
                      "
                    onClick={() => handleShow("buy")}
                  >
                    BUY
                  </div>
                  <div
                    className="w-full border-x border-y border-customRed text-center text-customRed 
                        font-semibold text-lg rounded-md self-center cursor-pointer
                      "
                    onClick={() => handleShow("sell")}
                  >
                    SELL
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalComponent
        show={show}
        handleClose={handleClose}
        action={modalAction}
      />
    </div>
  );
};

export const getIcon = (value: string) => {
  switch (value) {
    case "upArrow":
      return (
        <svg viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path d="M2510 4103 c-27 -14 -307 -368 -1167 -1473 -623 -800 -1135 -1467 -1138 -1483 -10 -42 3 -81 36 -113 l30 -29 2289 0 2290 0 30 30 c37 37 48 91 28 132 -23 45 -2256 2911 -2281 2928 -38 25 -79 27 -117 8z" />
          </g>
        </svg>
      );
    default:
      return "";
  }
};
