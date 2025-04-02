import { useState, useEffect } from "react";
import { find } from "@/api/deal";
import { formatUnits } from "ethers";

const useFindData = () => {
  const [total, setTotal] = useState(0);

  const initialFormState = {
    owner: "",
    keyword: "",
    order_by: "",
    sort: "",
    category_id: 0,
    sub_category_id: 0,
    status: 1,
    type: 1,
    page: 0,
    limit: 5,
    star_address: "",
    join_address: "",
  };

  const [form, setForm] = useState(initialFormState);

  const [findData, setFindData] = useState([]);

  const changeFormValue = (type, value) => {
    setForm((prevForm) => {
      const newForm = { ...prevForm, [type]: value, page: 0 };
      if (type === "category_id") {
        newForm.sub_category_id = 0;
      }
      return newForm;
    });
  };

  const getFindData = async () => {
    let params = form;
    if (form.type === 2) {
      params.status = 0;
    }
    const res = await find(params);
    if (res.code === 0) {
      const formattedData = res.data.map((i) => ({
        ...i,
        employee_amount: formatUnits(i.employee_amount, 18),
        invite_amount: i.invite_amount ? formatUnits(i.invite_amount, 18) : 0,
      }));
      setFindData(formattedData);
      setTotal(res.total);
    }
  };

  const changePagination = (page) => {
    setForm((prevForm) => ({ ...prevForm, page: Number(page) - 1 }));
  };

  useEffect(() => {
    getFindData();
  }, [form]);

  useEffect(() => {
    setFindData([]);
  }, []);

  return {
    total,
    form,
    setForm,
    changePagination,
    changeFormValue,
    getFindData,
    setFindData,
    findData,
  };
};

export default useFindData;
