import React from "react";
import { useRouter } from "next/router";
import numeral from "numeral";
import styles from "../styles/Approval.module.css";
import InputElement from "../components/InputElement";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import PaymentSummary from "../components/PaymentSummary";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import {
  changeMonthlyPlan,
  changeRentAmount,
  payment,
} from "../store/slices/paymentSlice";
import { submitDetails } from "../store/actionCreators/saveDetails";
import PageLayout from "../Layouts/PageLayout";

const Approval = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    loading,
    rentAmount,
    monthlyPlan,
    monthlyPayment,
    monthlyEarning,
    accomodationStatus,
  } = useAppSelector(payment);

  const onChangeInput = (e) => {
    dispatch(changeRentAmount({ rentAmount: e.target.value }));
  };

  const updateMonthly = (plan) => {
    dispatch(changeMonthlyPlan({ monthlyPlan: plan }));
  };

  const submitForm = () => {
    dispatch(
      submitDetails(
        {
          rentAmount,
          monthlyPlan,
          monthlyPayment,
          monthlyEarning,
          accomodationStatus,
        },
        () => {
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      )
    );
  };

  return (
    <PageLayout>
      <div className={styles["form"]}>
        <div className={styles["form__header"]}>
          <h3>Payment Breakdown</h3>
        </div>
        <div className={styles["form__body"]}>
          <InputElement
            onChange={onChangeInput}
            caption="Rent request amount?"
            name="rent"
            customStyle
            value={`₦${numeral(rentAmount).format("0,0")}`}
          />
          <SelectInput
            plan={monthlyPlan}
            onChange={updateMonthly}
            caption="Monthly payment plan"
          />
          <PaymentSummary
            rent={numeral(rentAmount).format("0,0")}
            payable={numeral(monthlyPayment).format("0,0.00")}
            plan={monthlyPlan}
          />
          <Button
            onclick={submitForm}
            variant="purple"
            text={loading ? "loading..." : "accept"}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Approval;
