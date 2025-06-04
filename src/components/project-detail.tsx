import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, Chip, Avatar, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { WalletConnectButton } from "./wallet-connect";

interface ProjectDetailProps {
  project: any;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(project.comments || []);
  const [upvotes, setUpvotes] = useState(project.reactions?.upvotes || 0);
  const [likes, setLikes] = useState(project.reactions?.likes || 0);

  if (!project) return <div>Project not found</div>;

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: `c${Date.now()}`,
        author: "Current User",
        avatar: "https://i.pravatar.cc/150?u=currentuser",
        text: commentText.trim(),
        timestamp: "now",
        likes: 0
      }
    ]);
    setCommentText("");
  };

  return (
    <>
      {/* Mobile: Replace main app header with project header (back + name + actions) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-black border-b border-default-200 flex items-center h-14 px-2 shadow-sm">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={onBack}
          aria-label="Back"
          className="mr-2"
        >
          <Icon icon="lucide:arrow-left" width={22} height={22} />
        </Button>
        <span className="font-semibold text-lg truncate max-w-[40vw]">{project.title || project.name}</span>
        <div className="flex-1" />
        <Button
          as="a"
          href="/search"
          variant="bordered"
          size="sm"
          startContent={<Icon icon="lucide:sparkles" width={16} height={16} />}
          className="ml-2 px-2 h-8 text-xs font-medium border-default-200 hover:bg-default-100"
        >
          Buidl AI
        </Button>
        <div className="ml-2">
          <WalletConnectButton />
        </div>
      </div>
      {/* Add top padding to avoid overlap with sticky mobile nav */}
      <div className="pt-4 md:pt-8 px-2 md:px-8 flex justify-center animate-in fade-in duration-300">
        <Card className="token-detail-card w-full max-w-2xl md:max-w-7xl md:p-12 p-0 rounded-2xl shadow-xl bg-white dark:bg-neutral-900 min-h-[600px]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            {/* Left info panel (desktop) */}
            <div className="md:w-1/3 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-default-200 pb-4 md:pb-0 md:pr-6">
              <div className="flex items-center gap-3">
                <Avatar src={project.logo_url} className="w-14 h-14 md:w-20 md:h-20" radius="sm" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl md:text-2xl font-bold">{project.title || project.name}</h2>
                    {project.grant_program && (
                      <Chip size="sm" variant="flat" color={project.grant_program.type === 'RetroPGF' ? 'warning' : 'primary'}>
                        {project.grant_program.type}
                      </Chip>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.categories?.map((cat: string, i: number) => (
                      <Chip key={i} size="sm" variant="flat" color="primary">{cat}</Chip>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-default-500">
                <Icon icon="lucide:badge-check" width={16} height={16} />
                <span>{project.status || (project.is_active ? 'Active' : 'Inactive')}</span>
              </div>
              {project.grant_program && (
                <div className="text-xs text-default-400">
                  Grant Program: <span className="font-medium">{project.grant_program.name}</span>
                </div>
              )}
              {/* Rounds/positions */}
              {project.table_positions && project.table_positions.length > 0 && (
                <div className="text-xs text-default-400">
                  Rounds:
                  <ul className="ml-2 mt-1 list-disc">
                    {project.table_positions.map((pos: any, i: number) => (
                      <li key={i} className="text-xs text-default-600">{pos.round}: <span className="font-semibold">#{pos.position}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Action buttons */}
              <div className="flex gap-2 mt-2">
                {project.url && (
                  <Button size="sm" variant="flat" color="primary" startContent={<Icon icon="lucide:link" width={14} height={14} />} onPress={() => window.open(project.url, '_blank')}>
                    Website
                  </Button>
                )}
              </div>
              {/* Funding/amount */}
              <div className="mt-2">
                <div className="text-lg md:text-2xl font-bold">${project.amount_received?.toLocaleString() || "0.00"}</div>
                <div className="text-xs text-default-400">Total Funding</div>
              </div>
            </div>
            {/* Main panel (right) */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Description */}
              <div className="text-sm md:text-base text-default-600 mb-2">{project.description}</div>
              {/* Chart/graph (if available) */}
              {project.funding_history && project.funding_history.length > 1 && (
                <div className="mb-2">
                  <div className="text-xs text-default-400 mb-1">Funding History</div>
                  <div className="bg-default-100 rounded-lg p-2">
                    {/* Simple chart using SVG or a chart lib, placeholder here */}
                    <svg width="100%" height="60" viewBox="0 0 200 60">
                      <polyline
                        fill="none"
                        stroke="#1d9bf0"
                        strokeWidth="2"
                        points={project.funding_history.map((v: number, i: number, arr: number[]) => `${(i/(arr.length-1))*200},${60-(v/Math.max(...arr))*50}`).join(' ')}
                      />
                    </svg>
                  </div>
                </div>
              )}
              {/* Upvotes, Likes, Comments Stats */}
              <div className="flex gap-6 mt-2 mb-2">
                <div className="flex items-center gap-1 text-[#00ba7c]">
                  <Icon icon="lucide:rocket" width={18} />
                  <span className="font-semibold">{upvotes}</span>
                  <span className="text-xs text-default-500">Upvotes</span>
                </div>
                <div className="flex items-center gap-1 text-[#f91880]">
                  <Icon icon="lucide:heart-fill" width={18} />
                  <span className="font-semibold">{likes}</span>
                  <span className="text-xs text-default-500">Likes</span>
                </div>
                <div className="flex items-center gap-1 text-[#1d9bf0]">
                  <Icon icon="lucide:message-circle" width={18} />
                  <span className="font-semibold">{comments.length}</span>
                  <span className="text-xs text-default-500">Comments</span>
                </div>
              </div>
              {/* Discussion Section */}
              <div className="mt-2">
                <h3 className="font-semibold mb-2">Discussion</h3>
                <div className="space-y-4">
                  {comments.length === 0 && <div className="text-default-400 text-sm">No comments yet.</div>}
                  {comments.map((comment: any) => (
                    <div key={comment.id} className="flex gap-3 items-start">
                      <Avatar src={comment.avatar} className="w-8 h-8" radius="full" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-default-400">{comment.timestamp}</span>
                        </div>
                        <div className="text-sm mt-1">{comment.text}</div>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-3 mt-2">
                    <Avatar src="https://i.pravatar.cc/150?u=currentuser" className="w-8 h-8" radius="full" />
                    <div className="flex-1 flex justify-center">
                      <div className="w-full max-w-md">
                        <Textarea
                          value={commentText}
                          onValueChange={setCommentText}
                          placeholder="Post your reply"
                          minRows={1}
                          maxRows={3}
                          classNames={{
                            input: "bg-transparent resize-none text-[15px] p-2 leading-tight",
                            inputWrapper: "bg-default-100 hover:bg-default-200 transition-colors rounded-2xl min-h-[36px]"
                          }}
                        />
                        {commentText.trim() && (
                          <div className="flex justify-end mt-1">
                            <Button
                              size="sm"
                              className="bg-[#1d9bf0] text-white font-bold rounded-full px-3 h-7 text-sm hover:bg-[#1a8cd8]"
                              onPress={handleSubmitComment}
                            >
                              Reply
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
