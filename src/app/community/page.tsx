
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { issues as initialIssues, users as initialUsers, Issue } from '@/lib/data';
import { TranslatedText } from '@/components/translated-text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IssueCard } from '@/components/issue-card';
import Link from 'next/link';
import { FileText, MessageSquare } from 'lucide-react';


// Dummy data for community posts
const initialPosts = [
  {
    id: 'post-1',
    author: initialUsers.priya,
    timestamp: '2024-07-28T10:00:00Z',
    content: 'Has anyone noticed the increase in traffic near the new tech park? The city should consider a new flyover.',
    comments: [
      { id: 'c1-1', author: initialUsers.rohan, text: 'Absolutely! The congestion during peak hours is unbearable.' },
      { id: 'c1-2', author: initialUsers.ananya, text: 'A petition might be a good idea to show the officials how many people are affected.' },
    ],
  },
  {
    id: 'post-2',
    author: initialUsers.arjun,
    timestamp: '2024-07-27T18:45:00Z',
    content: 'The new community garden initiative is wonderful! Let\'s organize a cleanup drive this weekend to prepare the area.',
    comments: [],
  },
];


export default function CommunityPage() {
  const { t } = useLanguage();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [posts, setPosts] = useState(initialPosts);
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [newPostContent, setNewPostContent] = useState('');


  const handleCreatePost = () => {
    if (!isAuthenticated) {
        openAuthModal();
        return;
    }
    if (newPostContent.trim() && user) {
      const newPost = {
        id: `post-${Date.now()}`,
        author: { id: user.uid, name: user.displayName || t('anonymous'), avatar: user.photoURL || '' },
        timestamp: new Date().toISOString(),
        content: newPostContent,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  const handleIssueReported = (newIssue: Issue) => {
    setIssues(prevIssues => [newIssue, ...prevIssues]);
  };


  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1 bg-background px-4 py-8 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold"><TranslatedText text={t('community_forum_title')} /></h1>
            <p className="mt-2 text-muted-foreground">
              <TranslatedText text={t('community_forum_subtitle')} />
            </p>
          </div>

          <Tabs defaultValue="issues" className="w-full">
            <div className="flex justify-center items-center mb-6">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                  <TabsTrigger value="issues">
                    <FileText className="mr-2 h-4 w-4" />
                    <TranslatedText text={t('civic_issues')} />
                  </TabsTrigger>
                  <TabsTrigger value="discussions">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <TranslatedText text={t('general_discussions')} />
                  </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="issues" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {issues.map(issue => (
                  <Link key={issue.id} href={`/issues/${issue.id}`}>
                    <IssueCard issue={issue} />
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="discussions" className="mt-6 max-w-3xl mx-auto">
               <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-xl font-semibold font-headline"><TranslatedText text={t('create_new_post')} /></h2>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full gap-2">
                    <Textarea
                      placeholder={t('whats_on_your_mind')}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <Button onClick={handleCreatePost}><TranslatedText text={t('post_to_forum')} /></Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold"><TranslatedText text={post.author.name} /></p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(post.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/90">
                        <TranslatedText text={post.content} />
                      </p>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4">
                      <h3 className="text-sm font-semibold"><TranslatedText text={t('comments')} /></h3>
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-3 text-sm">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="font-semibold"><TranslatedText text={comment.author.name} /></span>
                                <p className="text-muted-foreground">
                                    <TranslatedText text={comment.text} />
                                </p>
                            </div>
                        </div>
                      ))}
                      <div className="w-full flex items-center gap-2 pt-2 border-t">
                        <Avatar className="h-8 w-8">
                            {user && <AvatarImage src={user.photoURL || ''} />}
                            <AvatarFallback>
                                {user?.displayName?.charAt(0) || '?'}
                            </AvatarFallback>
                        </Avatar>
                        <Textarea placeholder={t('write_a_comment')} className="min-h-[40px] flex-1 text-sm" />
                        <Button size="sm"><TranslatedText text={t('reply')} /></Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </main>
    </div>
  );
}
