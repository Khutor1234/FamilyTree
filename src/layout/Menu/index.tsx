import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { AiOutlineCaretRight, AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { format } from "date-fns";

import { TState } from "../../components/interfaces";
import { mainMenu as menu } from "../../components/data";
import { treeSelector } from "../../store/selectors/tree";
import { userSelector } from "../../store/selectors/user";
import { countYears } from "../../utils";
import { MenuProps } from "./props";
import styles from "./index.module.scss";

const Menu = ({ className, user, tree }: MenuProps): JSX.Element => {
  const [open, setOpen] = useState<string[]>([]);

  const variants = {
    visible: {
      opacity: 1,
      height: "auto",
    },
    hidden: { opacity: 0, height: 0 },
  };

  const handleOpen = (type: string) => {
    if (open.find((el) => el === type)) {
      setOpen(open.filter((el) => el !== type));
    } else {
      setOpen([...open, type]);
    }
  };

  const renderMenuInside = (id: number) => {
    switch (id) {
      case 1:
        return user?.facts?.map((el) => (
          <li key={el.id + "" + Math.random()} className={styles.factsList}>
            {el.year && <div className={styles.year}>{el.year}</div>}
            {user?.born?.date && (
              <div className={styles.yearNow}>
                (
                {countYears(
                  el.year,
                  format(new Date(user?.born?.date), "yyyy")
                )}
                р.)
              </div>
            )}
            <div className={styles.text}>{el.text}</div>
          </li>
        ));
      case 2:
        return (
          <Fragment>
            {user?.spouses.map((el) => {
              const thisUser = tree.find((elem) => elem.id === el.id);
              return (
                <li
                  key={thisUser?.id + "" + Math.random()}
                  className={styles.relativesList}
                >
                  <div className={styles.image}>
                    <CgProfile size="30px" />
                  </div>
                  <div className={styles.name}>
                    {thisUser?.name} {thisUser?.surname} {thisUser?.maidenName}
                  </div>
                  <div className={styles.status}>
                    {thisUser?.gender === "male" ? "Чоловік" : "Дружина"}
                    {thisUser?.born.date &&
                      thisUser.live &&
                      ", " +
                        countYears(
                          format(new Date(thisUser?.born.date), "yyyy")
                        ) +
                        "p."}
                  </div>
                </li>
              );
            })}
            {user?.children.map((el) => {
              const thisUser = tree.find((elem) => elem.id === el.id);
              return (
                <li
                  key={thisUser?.id + "" + Math.random()}
                  className={styles.relativesList}
                >
                  <div className={styles.image}>
                    <CgProfile size="30px" />
                  </div>
                  <div className={styles.name}>
                    {thisUser?.name} {thisUser?.surname} {thisUser?.maidenName}
                  </div>
                  <div className={styles.status}>
                    {thisUser?.gender === "male" ? "Син" : "Донька"}
                    {thisUser?.born.date &&
                      thisUser.live &&
                      ", " +
                        countYears(
                          format(new Date(thisUser?.born.date), "yyyy")
                        ) +
                        "p."}
                  </div>
                </li>
              );
            })}
            {user?.parents.map((el) => {
              const thisUser = tree.find((elem) => elem.id === el.id);
              return (
                <li
                  key={thisUser?.id + "" + Math.random()}
                  className={styles.relativesList}
                >
                  <div className={styles.image}>
                    <CgProfile size="30px" />
                  </div>
                  <div className={styles.name}>
                    {thisUser?.name} {thisUser?.surname} {thisUser?.maidenName}
                  </div>
                  <div className={styles.status}>
                    {thisUser?.gender === "male" ? "Батько" : "Мати"}
                    {thisUser?.born.date &&
                      thisUser.live &&
                      ", " +
                        countYears(
                          format(new Date(thisUser?.born.date), "yyyy")
                        ) +
                        "p."}
                  </div>
                </li>
              );
            })}
            {user?.siblings.map((el) => {
              const thisUser = tree.find((elem) => elem.id === el.id);

              return (
                <li
                  key={thisUser?.id + "" + Math.random()}
                  className={styles.relativesList}
                >
                  <div className={styles.image}>
                    <CgProfile size="30px" />
                  </div>
                  <div className={styles.name}>
                    {thisUser?.name} {thisUser?.surname} {thisUser?.maidenName}
                  </div>
                  <div className={styles.status}>
                    {thisUser?.gender === "male" ? "Брат" : "Сестра"}
                    {thisUser?.born.date &&
                      thisUser.live &&
                      ", " +
                        countYears(
                          format(new Date(thisUser?.born.date), "yyyy")
                        ) +
                        "p."}
                  </div>
                </li>
              );
            })}
          </Fragment>
        );

      case 3:
        return tree
          .filter(
            (elem) =>
              elem?.born?.date &&
              format(new Date(), "MM") ===
                format(new Date(elem?.born?.date), "MM")
          )
          ?.sort(
            (a, b) =>
              a?.born?.date &&
              b?.born?.date &&
              +format(new Date(a?.born?.date), "dd") -
                +format(new Date(b?.born?.date), "dd")
          )
          ?.map((el) => (
            <li className={styles.bDay} key={el.id}>
              <div className={styles.date}>
                {format(new Date(el?.born?.date), "dd.MM.yyyy")}
              </div>
              <div className={styles.persone}>
                {el.name} {el.surname} {el.maidenName}
              </div>
            </li>
          ));
      default:
        return null;
    }
  };

  return (
    <div className={cn(className, styles.menu)}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <CgProfile size="60px" />
        </div>
        <div className={styles.name}>
          {user?.name} {user?.surname}
          {user?.maidenName && "(" + user?.maidenName + ")"}
        </div>
        <div className={styles.born}>
          {user?.born?.country}({user?.born?.city}),
          {user?.born.date &&
            countYears(format(new Date(user?.born.date), "yyyy"))}
          р.
        </div>

        <Link to={`/${user?.id}`}>
          <div className={styles.more}>
            Дізнатись більше
            <AiOutlineCaretRight size="14px" />
          </div>
        </Link>
      </div>

      {menu.map((el) => (
        <div key={el.id} className={styles.menuItem}>
          <div
            className={styles.menuHeader}
            onClick={() => handleOpen(el.type)}
          >
            {el.name} <AiFillCaretDown size="14px" />
          </div>
          <motion.ul
            layout
            variants={variants}
            initial={open.find((e) => e === el.type) ? "visible" : "hidden"}
            animate={open.find((e) => e === el.type) ? "visible" : "hidden"}
          >
            {renderMenuInside(el.id)}
          </motion.ul>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: TState) => ({
  user: userSelector(state),
  tree: treeSelector(state),
});

export default connect(mapStateToProps)(Menu);
