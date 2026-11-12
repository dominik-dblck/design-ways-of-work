/**
 * - `EndpointFolds` · each endpoint folded under its ticket, name and state
 * - opened, its code
 */
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../workspace/contractView.ts';
import type { EndpointCode } from '../../../workspace/contractView.ts';
import { CodeBlock } from '../../molecules/CodeBlock/index.ts';
import { FoldList } from '../../molecules/FoldList/index.ts';
import { EndpointFoldsHead } from './components/EndpointFoldsHead.tsx';

interface EndpointFoldsProps {
  readonly endpoints: readonly EndpointCode[];
}

function EndpointFolds({ endpoints }: EndpointFoldsProps): ReactElement {
  return (
    <FoldList
      {...words.folds}
      folds={endpoints.map((endpoint) => ({
        id: endpoint.anchor,
        head: <EndpointFoldsHead endpoint={endpoint} />,
        body: <CodeBlock lines={endpoint.lines} />,
      }))}
    />
  );
}

export { EndpointFolds };
