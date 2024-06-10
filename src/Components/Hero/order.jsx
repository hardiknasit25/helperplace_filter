import { FaSortAmountDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../features/dataSlice";
import { useEffect, useRef, useState } from "react";

function Order() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false)
  const order = useSelector((state) => state.order);

  const handleOrderChange = (orderType) => {
    dispatch(addOrder(orderType));
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full h-[37px] flex justify-end mt-4">
      <div
        className="w-[150px] h-[37px] p-2 bg-[#25AE88] rounded-md text-white font-semibold flex justify-start items-center gap-2"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FaSortAmountDown className="text-white w-4 h-4" />
        <button className=" text-sm font-semibold">
          {order === 'last_active'
            ? 'Last Active'
            : order === 'available_from'
              ? 'Available From'
              : order === 'publish_date'
                ? 'Publish Date'
                : 'Last Active'}
        </button>
      </div>
      {showMenu && (
        <div className="absolute flex flex-col gap-3 top-full right-0 bg-slate-100 z-20">
          <div className="relative w-[150px]  bg-slate-50 z-20">
            <div
              className="flex flex-col justify-center cursor-pointer gap-2 text-sm hover:bg-slate-100 h-10 p-2"
              onClick={() => {
                handleOrderChange('last_active');
                setShowMenu(!showMenu);
              }}
            >
              <span>Last Active</span>
            </div>
            <div
              className="flex flex-col justify-center cursor-pointer gap-2 text-sm hover:bg-slate-100 h-10 p-2"
              onClick={() => {
                handleOrderChange('available_from');
                setShowMenu(!showMenu);
              }}
            >
              <span>Available From</span>
            </div>
            <div
              className="flex flex-col justify-center cursor-pointer gap-2 text-sm hover:bg-slate-100 h-10 p-2"
              onClick={() => {
                handleOrderChange('publish_date');
                setShowMenu(!showMenu);
              }}
            >
              <span>Publish Date</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
