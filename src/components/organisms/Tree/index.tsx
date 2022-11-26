import { memo, useState, useEffect, useCallback } from "react";
import ReactFamilyTree from "react-family-tree";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

import { TState, TDispatch } from "../../interfaces";
import { treeSelector, isRequestSelector } from "../../../store/selectors/tree";
import { logOut } from "../../../store/actions/user";
import { userSelector } from "../../../store/selectors/user";
import { getTree } from "../../../store/actions/tree";
import { ZoomPan, FamilyNode, Button } from "../../index";
import { ExtNodeAdditionally, NodeAdditionally } from "../../interfaces";
import { TreeProps } from "./props";
import styles from "./index.module.scss";

const WIDTH = 200;
const HEIGHT = 100;

type Source = Array<NodeAdditionally>;

const Tree = memo<TreeProps>(function Tree({
  logOut,
  getTree,
  tree,
  isRequest,
  user,
  ...props
}) {
  const [nodes, setNodes] = useState<Source>([]);
  const [myId, setMyId] = useState<string>("");
  const [rootId, setRootId] = useState<string>("");
  const [input, setInput] = useState("");
  // const [warning, setWarning] = useState(false);

  useEffect(() => {
    getTree();
  }, [getTree]);

  useEffect(() => {
    if (tree && user?.id) {
      setNodes([]);
      setRootId(user.id);
      setMyId(user.id);
      setNodes(tree);
    }
  }, [tree, user.id]);

  useEffect(() => {
    const arrNames = input?.split(" ");
    const findUser = tree.find(
      (el) =>
        arrNames[0] &&
        el.surname === arrNames[0] &&
        arrNames[1] &&
        el.name === arrNames[1] &&
        arrNames[2] &&
        el.fatherName === arrNames[2]
    );

    if (!!input && findUser) {
      setRootId(findUser.id);
    }
  }, [input, tree]);

  const onResetClick = useCallback(() => {
    setRootId(myId);
    setInput("");
  }, [myId]);

  if (isRequest) {
    return (
      <div className={styles.spinner}>
        <ReactLoading type="spin" color="#8DE4AF" />
      </div>
    );
  }

  return (
    <div className={styles.container} {...props}>
      <header className={styles.header}>
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            name="names"
            list="names"
            placeholder="Пошук по імені..."
          />

          <datalist id="names">
            {tree &&
              tree?.map((el) => (
                <option
                  key={el.id}
                  value={el.surname + " " + el.name + " " + el.fatherName}
                />
              ))}
          </datalist>
          {/* {warning && <div>Нічого не знайдено</div>} */}
        </div>

        <div className={styles.buttons}>
          {rootId !== myId && (
            <Button
              className={styles.reset}
              text="Скинути"
              onClick={onResetClick}
            />
          )}

          <Button
            className={styles.logout}
            text="Вийти"
            onClick={() => logOut()}
          />
        </div>
      </header>

      {nodes.length > 0 && (
        <ZoomPan
          min={0.5}
          max={2.5}
          captureWheel
          className={styles.treeWrapper}
        >
          <ReactFamilyTree
            nodes={nodes as NodeAdditionally[]}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            className={styles.tree}
            renderNode={(node: ExtNodeAdditionally) => (
              <FamilyNode
                key={node.id}
                node={node}
                isRoot={node.id === rootId}
                onSubClick={setRootId}
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  transform: `translate(${node.left * (WIDTH / 2)}px, ${
                    node.top * (HEIGHT / 2)
                  }px)`,
                }}
              />
            )}
          />
        </ZoomPan>
      )}
    </div>
  );
});

const mapStateToProps = (state: TState) => ({
  tree: treeSelector(state),
  isRequest: isRequestSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = (dispatch: TDispatch) =>
  bindActionCreators(
    {
      logOut,
      getTree,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
