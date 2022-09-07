import { ChangeEvent, memo, useState, useEffect, useCallback } from 'react';
import ReactFamilyTree from 'react-family-tree';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TState, TDispatch } from '../../interfaces';
import { treeSelector } from '../../../store/selectors/tree';
import { logOut } from '../../../store/actions/user';
import { getTree } from '../../../store/actions/tree';
import averageTree from 'relatives-tree/samples/average-tree.json';
import couple from 'relatives-tree/samples/couple.json';
import diffParents from 'relatives-tree/samples/diff-parents.json';
import divorcedParents from 'relatives-tree/samples/divorced-parents.json';
import empty from 'relatives-tree/samples/empty.json';
import severalSpouses from 'relatives-tree/samples/several-spouses.json';
import simpleFamily from 'relatives-tree/samples/simple-family.json';
import testTreeN1 from 'relatives-tree/samples/test-tree-n1.json';
import testTreeN2 from 'relatives-tree/samples/test-tree-n2.json';
import test from '../../../test.json';

import { ZoomPan, FamilyNode, Button } from '../../index';
import { ExtNodeAdditionally, NodeAdditionally } from '../../interfaces';
import { TreeProps } from './props';
import styles from './index.module.scss';

const WIDTH = 200;
const HEIGHT = 100;

const DEFAULT_SOURCE = 'test';

type Source = Array<NodeAdditionally>;

const SOURCES: { [key: string]: Source } = {
  'average-tree.json': averageTree as Source,
  'couple.json': couple as Source,
  'diff-parents.json': diffParents as Source,
  'divorced-parents.json': divorcedParents as Source,
  'empty.json': empty as Source,
  'several-spouses.json': severalSpouses as Source,
  'simple-family.json': simpleFamily as Source,
  'test-tree-n1.json': testTreeN1 as Source,
  'test-tree-n2.json': testTreeN2 as Source,
  test: test as Source,
};

const Tree = memo<TreeProps>(function Tree({
  logOut,
  getTree,
  tree,
  ...props
}) {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE);
  const [nodes, setNodes] = useState<Source>([]);
  const [myId, setMyId] = useState<string>('');
  const [rootId, setRootId] = useState<string>('');

  useEffect(() => {
    getTree();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      let newNodes = SOURCES[source];

      if (newNodes) {
        setNodes([]); // Avoid invalid references to unknown nodes
        setRootId(newNodes[0].id);
        setMyId(newNodes[0].id);
        setNodes(newNodes);
      }
    };

    loadData();
  }, [source]);

  const onResetClick = useCallback(() => setRootId(myId), [myId]);
  const onSetSource = (event: ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
  };

  const sources = {
    ...SOURCES,
    tree: tree as Source,
  };

  return (
    <div className={styles.container} {...props}>
      <header className={styles.header}>
        <select onChange={onSetSource} defaultValue={source}>
          {Object.keys(sources).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {rootId !== myId && (
          <div className={styles.reset} onClick={onResetClick}>
            Reset
          </div>
        )}

        <input
          type="text"
          name="names"
          list="names"
          placeholder="Пошук по імені..."
        />
        <datalist id="names">
          <option value="Boston hhhhdhdh" />
          <option value="Cambridge" />
        </datalist>

        <Button
          className={styles.logout}
          text="Вийти"
          onClick={() => logOut()}
        />
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
