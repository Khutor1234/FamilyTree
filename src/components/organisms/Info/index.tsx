import cn from "classnames";
import { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ModalAdd } from "../../index";

import { relativeItems } from "../../data";
import { countYears } from "../../../utils";
import { Button } from "../../index";
import { TState, TDispatch, IUser } from "../../interfaces";
import { treeSelector } from "../../../store/selectors/tree";
import { logOut } from "../../../store/actions/user";
import { getTree } from "../../../store/actions/tree";
import { InfoProps } from "./props";
import styles from "./index.module.scss";

const Info = ({ id, tree, logOut }: InfoProps): JSX.Element => {
  const user = tree.find((el) => el.id === id);
  const [modal, setModal] = useState(false);

  return (
    <div className={cn(styles.wrapper)}>
      <ModalAdd user={user} modal={modal} close={() => setModal(false)} />
      <div className={styles.header}>
        <Link to={`/`}>
          <div className={styles.back}>
            <IoIosArrowRoundBack size="20px" />
            <span>Повернутися до дерева</span>
          </div>
        </Link>

        <div>
          <Button text="Редагувати" onClick={() => setModal(true)} />
          <Link to={`/`}>
            <Button
              className={styles.logout}
              text="Вийти"
              onClick={() => logOut()}
            />
          </Link>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <CgProfile size="150px" />
          </div>
          <div className={styles.name}>
            {user?.name} {user?.surname}
            {user?.maidenName && "(" + user?.maidenName + ")"}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.headerItem}>Народження</div>

          {user?.born.country ? (
            <div className={styles.text}>{user?.born.country}</div>
          ) : (
            <div className={styles.unknown}>Невідомо</div>
          )}
          <div className={styles.line} />
          <div className={styles.title}>Країна</div>

          {user?.born.city ? (
            <div className={styles.text}>{user?.born.city}</div>
          ) : (
            <div className={styles.unknown}>Невідомо</div>
          )}
          <div className={styles.line} />
          <div className={styles.title}>Місто/село</div>

          {user?.born.date ? (
            <div className={styles.text}>
              {format(new Date(user?.born?.date), "dd.MM.yyyy")}
            </div>
          ) : (
            <div className={styles.unknown}>Невідомо</div>
          )}
          <div className={styles.line} />
          <div className={styles.title}>Дата</div>

          {!user?.now.country && user?.died?.date ? (
            <>
              <div className={styles.headerItem}>Смерть</div>

              {user?.died?.country ? (
                <div className={styles.text}>{user?.died?.country}</div>
              ) : (
                <div className={styles.unknown}>Невідомо</div>
              )}
              <div className={styles.line} />
              <div className={styles.title}>Країна</div>

              {user?.died?.city ? (
                <div className={styles.text}>{user?.died?.city}</div>
              ) : (
                <div className={styles.unknown}>Невідомо</div>
              )}
              <div className={styles.line} />
              <div className={styles.title}>Місто/село</div>

              {user?.died?.date ? (
                <div className={styles.text}>
                  {format(new Date(user?.died?.date), "dd.MM.yyyy")}
                </div>
              ) : (
                <div className={styles.unknown}>Невідомо</div>
              )}
              <div className={styles.line} />
              <div className={styles.title}>Дата</div>

              {user?.died?.reason ? (
                <div className={styles.text}>{user?.died?.reason}</div>
              ) : (
                <div className={styles.unknown}>Невідомо</div>
              )}
              <div className={styles.line} />
              <div className={styles.title}>Причина смерті</div>

              {user?.died?.place ? (
                <div className={styles.text}>{user?.died?.place}</div>
              ) : (
                <div className={styles.unknown}>Невідомо</div>
              )}
              <div className={styles.line} />
              <div className={styles.title}>Місце поховання</div>
            </>
          ) : (
            <>
              <div className={styles.headerItem}>Зараз проживає</div>

              {user?.now.country ? (
                <div className={styles.text}>{user?.now.country}</div>
              ) : (
                <div className={styles.unknown}>Невідомо</div>
              )}
              <div className={styles.line} />
              <div className={styles.title}>Країна</div>

              {user?.now.city ? (
                <div className={styles.text}>{user?.now.city}</div>
              ) : (
                <div className={styles.unknown}>Невідомо</div>
              )}
              <div className={styles.line} />
              <div className={styles.title}>Місто/село</div>
            </>
          )}
        </div>
      </div>
      <div className={styles.relalives}>
        <div className={cn(styles.title, styles.mr)}>Близькі родичі:</div>
        {relativeItems.map((elem) => {
          return (
            <div className={styles.relativesItem} key={elem.id}>
              <div className={styles.relativesTitle}>{elem.title}:</div>
              <ul>
                {user &&
                (user[elem.name as keyof IUser] as unknown as any[]).length >
                  0 ? (
                  (user[elem.name as keyof IUser] as unknown as any[])?.map(
                    (el) => {
                      const thisUser = tree.find((item) => item.id === el!.id);
                      return (
                        <li key={el.id}>
                          <Link to={`/${el?.id}`}>
                            <span>
                              {thisUser?.name} {thisUser?.surname}
                            </span>
                            {thisUser?.born.date && thisUser.live && (
                              <span>
                                (
                                {countYears(
                                  format(new Date(thisUser?.born.date), "yyyy")
                                )}
                                р.)
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    }
                  )
                ) : (
                  <div className={styles.unknown}>Невідомо</div>
                )}
              </ul>
            </div>
          );
        })}
      </div>
      <div className={styles.facts}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Коротенькі відомості:</div>
          <Button text="Додати" onClick={() => setModal(true)} />
        </div>

        {user?.facts && user?.facts?.length > 0 ? (
          user?.facts?.map((el) => (
            <div key={el.id} className={styles.factItem}>
              <div className={styles.yearsWrapper}>
                <div className={styles.year}>{el.year}р.</div>
                <div className={styles.now}>
                  (
                  {countYears(
                    el.year,
                    format(new Date(user?.born?.date), "yyyy")
                  )}
                  р.)
                </div>
              </div>
              <div className={styles.text}>{el.text}</div>
            </div>
          ))
        ) : (
          <div className={styles.noneData}>
            Відомостей поки нема, але ви можете їх додати
          </div>
        )}
      </div>
      <div className={styles.social}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Соціальні мережі:</div>
          <Button text="Додати" onClick={() => setModal(true)} />
        </div>

        <div className={styles.socialItem}>
          <div className={styles.socialText}>Телеграм</div>
          {user?.social?.telegram ? (
            <div className={styles.socialValue}>{user?.social?.telegram}</div>
          ) : (
            <div className={styles.unknown}>Невідомо</div>
          )}
        </div>
        <div className={styles.socialItem}>
          <div className={styles.socialText}>Інстаграм</div>
          {user?.social?.instagram ? (
            <div className={styles.socialValue}>{user?.social?.instagram}</div>
          ) : (
            <div className={styles.unknown}>Невідомо</div>
          )}
        </div>
        <div className={styles.socialItem}>
          <div className={styles.socialText}>Мобільний телефон</div>
          {user?.social?.tel ? (
            <div className={styles.socialValue}>{user?.social?.tel}</div>
          ) : (
            <div className={styles.unknown}>Невідомо</div>
          )}
        </div>
        <div className={styles.socialItem}>
          <div className={styles.socialText}>Email</div>
          {user?.email ? (
            <div className={styles.socialValue}>{user?.email}</div>
          ) : (
            <div className={styles.unknown}>Невідомо</div>
          )}
        </div>
      </div>

      <div className={styles.photo}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Фотографії:</div>
          <Button text="Додати" onClick={() => setModal(true)} />
        </div>
        <div className={styles.noneData}>
          Фотографій поки нема, але ви можете їх додати
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: TState) => ({
  tree: treeSelector(state),
});

const mapDispatchToProps = (dispatch: TDispatch) =>
  bindActionCreators(
    {
      logOut,
      getTree,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Info);
