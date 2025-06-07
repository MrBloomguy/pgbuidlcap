import React from 'react';
import { Icon } from '@iconify/react';
import { formatNumber, getPercentageClass } from '../utils/format-utils';

interface TokenListViewProps {
  tokens: any[];
  onTokenSelect?: (tokenId: string) => void;
}

export const TokenListView: React.FC<TokenListViewProps> = ({ tokens, onTokenSelect }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-dark-surface-custom-2 border-b border-dark-border-custom">
          <tr>
            <th className="text-left py-3 px-4 text-xs text-dark-text-secondary font-medium">Project</th>
            <th className="text-right py-3 px-4 text-xs text-dark-text-secondary font-medium">Category</th>
            <th className="text-right py-3 px-4 text-xs text-dark-text-secondary font-medium">Funding Goal</th>
            <th className="text-right py-3 px-4 text-xs text-dark-text-secondary font-medium">Token Supply</th>
            <th className="text-right py-3 px-4 text-xs text-dark-text-secondary font-medium">Status</th>
            <th className="text-right py-3 px-4 text-xs text-dark-text-secondary font-medium">Links</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr 
              key={token.id}
              onClick={() => onTokenSelect?.(token.id)}
              className="border-b border-dark-border-custom hover:bg-dark-surface-custom-2 cursor-pointer transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <img src={token.imageUrl} alt={token.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-medium text-foreground">{token.name}</div>
                    <div className="text-sm text-dark-text-secondary">{token.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="text-right py-4 px-4">
                <span className="text-sm text-dark-text-secondary">{token.category || 'N/A'}</span>
              </td>
              <td className="text-right py-4 px-4">
                <div className="text-sm font-medium">{token.fundingGoal ? `${formatNumber(token.fundingGoal)} OP` : 'N/A'}</div>
              </td>
              <td className="text-right py-4 px-4">
                <div className="text-sm font-medium">{formatNumber(token.marketCap)}</div>
              </td>
              <td className="text-right py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="text-right py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  {token.links?.github && (
                    <a href={token.links.github} target="_blank" rel="noopener noreferrer" className="text-dark-text-secondary hover:text-foreground">
                      <Icon icon="lucide:github" className="w-4 h-4" />
                    </a>
                  )}
                  {token.links?.website && (
                    <a href={token.links.website} target="_blank" rel="noopener noreferrer" className="text-dark-text-secondary hover:text-foreground">
                      <Icon icon="lucide:globe" className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
