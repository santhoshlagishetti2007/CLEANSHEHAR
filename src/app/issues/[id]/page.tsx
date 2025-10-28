'use client'

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

import { AppHeader } from '@/components/app-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/hooks/use-language';
import { issues, Issue, Comment } from '@/lib/data';
import { notFound } from 'next/navigation';
import { AuthModal } from '@/components/auth-modal';

function IssueStatusBadge({ status, t }: { status: Issue['status'], t: (key: any) => string }) {
  const statusVariant = {
    Reported: 'secondary',
    'In Progress': 'default',
    Resolved: 'outline',
  } as const;

  const statusText = {
    Reported: t('reported'),
    'In Progress': t('in_progress'),
    Resolved: t('resolved'),
  };

  return <Badge variant={statusVariant[status]}>{statusText[status]}</Badge>;
}

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  
  const issue = issues.find(i => i.id === params.id);
  const [comments, setComments] = useState<Comment[]>(issue?.comments || []);
  const [newComment, setNewComment] = useState('');

  if (!issue) {
    notFound();
  }

  const handlePostComment = () => {
    if (!isAuthenticated) {
        setAuthModalOpen(true);
        return;
    }
    if (newComment.trim() && user) {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        text: newComment,
        author: { id: user.uid, name: user.displayName || 'Anonymous', avatar: user.photoURL || '' },
        timestamp: new Date().toISOString(),
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
  };


  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1 bg-background px-4 py-8 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/" passHref>
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all issues
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="p-0">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={issue.imageUrl}
                      alt={issue.title}
                      fill
                      className="rounded-t-lg object-cover"
                      data-ai-hint={issue.imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h1 className="mb-2 font-headline text-3xl font-bold">
                    {issue.title}
                  </h1>
                  <p className="text-muted-foreground">{issue.description}</p>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    {t('community_discussion')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {comments.map(comment => (
                      <div key={comment.id} className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback>
                            {comment.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex-1 rounded-lg border p-4 ${comment.isOfficialReply ? 'bg-secondary border-primary' : ''}`}>
                          <div className="mb-2 flex items-center justify-between">
                            <p className="font-semibold">
                              {comment.author.name}
                              {comment.isOfficialReply && (
                                <Badge variant="default" className="ml-2">{t('official_reply')}</Badge>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm text-foreground">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={t('add_comment_placeholder')}
                    />
                    <Button onClick={handlePostComment}>
                      {t('post_comment')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    {t('issue_details')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-24 font-semibold text-muted-foreground">{t('status')}</div>
                    <IssueStatusBadge status={issue.status} t={t} />
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 font-semibold text-muted-foreground">{t('department')}</div>
                    <span>{issue.department}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 font-semibold text-muted-foreground">{t('location')}</div>
                    <span>{issue.location.address}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 font-semibold text-muted-foreground">{t('reported_by')}</div>
                    <div className="flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                         <AvatarImage src={issue.author.avatar} />
                         <AvatarFallback>{issue.author.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <span>{issue.author.name}</span>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <div className="w-24 font-semibold text-muted-foreground">{t('upvotes')}</div>
                    <span>{issue.upvotes}</span>
                  </div>
                   <div className="flex items-start">
                    <div className="w-24 font-semibold text-muted-foreground">{t('comments')}</div>
                    <span>{comments.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <AuthModal open={isAuthModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
