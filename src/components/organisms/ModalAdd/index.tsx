import { useState, useEffect } from "react";
import Modal from "react-modal";
import { CgProfile } from "react-icons/cg";
import cn from "classnames";
import { IoIosArrowRoundBack } from "react-icons/io";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { addRelativesMenu as menu } from "../../data";
import { getTree, editUser } from "../../../store/actions/tree";
import { TState, TDispatch } from "../../interfaces";
import { treeSelector } from "../../../store/selectors/tree";
import { addUser } from "../../../store/actions/tree";
import { IUserFact } from "../../interfaces";
import { Button, Radio, FactsList, ModalCalendar } from "../../index";
import { ModalProps } from "./props";
import styles from "./index.module.scss";

const customStyles = {
  overlay: {
    backgroundColor: "RGBA(0,0,0,.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "RGBA(0,0,0,0)",
    border: "none",
    padding: 0,
  },
};
interface IUserBorn {
  city: string;
  country: string;
  date: null | Date;
}

interface IUserDied {
  city: string;
  country: string;
  date: null | Date;
  reason: string;
  place: string;
}
const ModalAdd = ({
  modal,
  close,
  node,
  addUser,
  user,
  getTree,
  editUser,
}: ModalProps): JSX.Element => {
  const [button, setButton] = useState("");
  const [gender, setGender] = useState("female");
  const [live, setLive] = useState(true);
  const [warning, setWarning] = useState(false);

  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("ss");
  const [born, setBorn] = useState<IUserBorn>({
    city: "s",
    country: "ssss",
    date: null,
  });
  const [now, setNow] = useState({ city: "", country: "" });
  const [died, setDied] = useState<IUserDied>({
    city: "",
    country: "",
    date: null,
    reason: "",
    place: "",
  });
  const [surname, setSurname] = useState("ssss");
  const [maidenName, setMaidenName] = useState("");
  const [facts, setFacts] = useState<IUserFact[]>([]);
  const [social, setSocial] = useState({
    telegram: "",
    instagram: "",
    tel: "",
  });

  useEffect(() => {
    if (user) {
      setGender(user.gender);
      setLive(user.live);
      setFatherName(user.fatherName);
      setEmail(user.email);
      setName(user.name);
      setBorn(user.born);
      setNow(user.now);
      setDied(user.died);
      setSurname(user.surname);
      setMaidenName(user.maidenName);
      setSocial(user.social);
      setFacts(user.facts);
    }
  }, [user]);

  const addPerson = () => {
    const data = {
      name,
      surname,
      born,
      died,
      email,
      facts,
      gender,
      maidenName,
      now,
      live,
      social,
      fatherName,
    };

    if (user) {
      editUser(
        {
          ...data,
          id: user.id,
        },
        getTree
      );
      close();
    }

    if (
      button &&
      node &&
      node.id &&
      name &&
      surname &&
      born.city &&
      born.country
    ) {
      addUser(button, node.id, data, getTree);
    } else {
      setWarning(true);
    }
  };

  return (
    <Modal
      style={customStyles}
      ariaHideApp={false}
      isOpen={modal}
      onRequestClose={() => {
        close();
        setButton("");
      }}
      contentLabel="Form"
    >
      {!button && !user ? (
        <div className={styles.buttons}>
          <div className={cn(styles.main, node && styles[node.gender])}>
            <CgProfile size="40px" />
            <span>
              {node?.name && node.name} {node?.surname && node.surname}
            </span>
          </div>
          {menu.map((el) => {
            if (
              (el.value === "parents" && node && node.parents.length > 1) ||
              (el.value === "spouses" && node && node.spouses.length > 0)
            ) {
              return (
                <div
                  key={el.id}
                  className={cn(styles[el.value], styles.empty)}
                  onClick={() => {}}
                >
                  {el?.empty}
                </div>
              );
            }
            return (
              <div
                key={el.id}
                className={styles[el.value]}
                onClick={() => setButton(el.value)}
              >
                {el.text}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.mainModal}>
          {!user && (
            <div className={styles.back} onClick={() => setButton("")}>
              <IoIosArrowRoundBack size="20px" />
              {menu.find((el) => el.value === button)?.text}
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <div className={styles.avatar}>
              <CgProfile size="100px" />
            </div>

            <div className={styles.info}>
              <Radio
                defaultValue={gender === "male" ? "val2" : "val1"}
                val1="Жінка"
                val2="Чоловік"
                onChange={(val) =>
                  setGender(val === "val1" ? "female" : "male")
                }
              />

              <div className={styles.label}>Головні відомості</div>
              <input
                className={cn(styles.input, warning && !name && styles.warning)}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Імя"
              />
              <input
                className={cn(
                  styles.mrS,
                  styles.input,
                  warning && !surname && styles.warning
                )}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Прізвище"
              />

              <div />
              <input
                className={cn(styles.input, styles.mrS)}
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                placeholder="По-батькові"
              />
              {gender === "female" && (
                <input
                  className={cn(styles.input)}
                  value={maidenName}
                  onChange={(e) => setMaidenName(e.target.value)}
                  placeholder="Дівоче призвіще"
                />
              )}
            </div>

            <div className={styles.live}>
              <div className={styles.label}>Народження</div>
              <ModalCalendar
                changetDate={born.date}
                onChange={(date) => {
                  setBorn({ ...born, date: date });
                }}
              />
              <input
                className={cn(
                  styles.input,
                  styles.sizeM,
                  warning && !born.country && styles.warning
                )}
                value={born.country}
                onChange={(e) => setBorn({ ...born, country: e.target.value })}
                placeholder="Країна"
              />
              <input
                className={cn(
                  styles.sizeM,
                  styles.input,
                  warning && !born.city && styles.warning
                )}
                value={born.city}
                onChange={(e) => setBorn({ ...born, city: e.target.value })}
                placeholder="Місто "
              />
              <Radio
                defaultValue={live ? "val1" : "val2"}
                val1={gender === "male" ? "Живий" : "Жива"}
                val2={gender === "male" ? " Мертвий" : " Мертва"}
                onChange={(val) => setLive(val === "val1" ? true : false)}
              />

              {live ? (
                <>
                  <div className={styles.label}>Зараз проживає</div>
                  <input
                    className={cn(styles.input, styles.sizeL, styles.mr)}
                    value={now.country}
                    onChange={(e) =>
                      setNow({ ...now, country: e.target.value })
                    }
                    placeholder="Країна"
                  />
                  <input
                    className={cn(styles.input, styles.sizeL)}
                    value={now.city}
                    onChange={(e) => setNow({ ...now, city: e.target.value })}
                    placeholder="Місто "
                  />
                </>
              ) : (
                <>
                  <div className={styles.label}>Смерть</div>
                  <ModalCalendar
                    changetDate={died.date}
                    onChange={(date) => {
                      setDied({ ...died, date: date });
                    }}
                  />
                  <input
                    className={cn(styles.input, styles.sizeM)}
                    value={died.country}
                    onChange={(e) =>
                      setDied({ ...died, country: e.target.value })
                    }
                    placeholder="Країна"
                  />
                  <input
                    className={cn(styles.input, styles.sizeM)}
                    value={died.city}
                    onChange={(e) => setDied({ ...died, city: e.target.value })}
                    placeholder="Місто "
                  />

                  <div />
                  <input
                    className={cn(styles.input, styles.sizeL, styles.mr)}
                    value={died.reason}
                    onChange={(e) =>
                      setDied({ ...died, reason: e.target.value })
                    }
                    placeholder="Причина смерті"
                  />
                  <input
                    className={cn(styles.input, styles.sizeL)}
                    value={died.place}
                    onChange={(e) =>
                      setDied({ ...died, place: e.target.value })
                    }
                    placeholder="Місце поховання або цвинтар"
                  />
                </>
              )}
            </div>

            <div className={styles.social}>
              <div className={styles.label}>Соціальні мережі:</div>
              <input
                className={cn(styles.input, styles.sizeL, styles.mr)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className={cn(styles.input, styles.sizeL)}
                value={social.tel}
                onChange={(e) => setSocial({ ...social, tel: e.target.value })}
                placeholder="Мобільний телефон"
              />

              <div />
              <input
                className={cn(styles.input, styles.sizeL, styles.mr)}
                value={social.instagram}
                onChange={(e) =>
                  setSocial({ ...social, instagram: e.target.value })
                }
                placeholder="Інстаграм"
              />
              <input
                className={cn(styles.input, styles.sizeL)}
                value={social.telegram}
                onChange={(e) =>
                  setSocial({ ...social, telegram: e.target.value })
                }
                placeholder="Телеграм"
              />
            </div>

            <div className={styles.facts}>
              <FactsList
                defaultFacts={facts}
                addToList={(facts: IUserFact[]) => setFacts(facts)}
              />

              <Button
                className={styles.button}
                onClick={() => {
                  addPerson();
                }}
                text={user ? "Зберегти" : "Додати"}
              />
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

const mapStateToProps = (state: TState) => ({
  tree: treeSelector(state),
});

const mapDispatchToProps = (dispatch: TDispatch) =>
  bindActionCreators(
    {
      addUser,
      getTree,
      editUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);
