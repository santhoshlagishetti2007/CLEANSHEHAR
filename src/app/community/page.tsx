
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users } from '@/lib/data';
import { AuthModal } from '@/components/auth-modal';
import { TranslatedText } from '@/components/translated-text';

// Dummy data for community posts
const initialPosts = [
  {
    id: 'post-1',
    author: users.priya,
    timestamp: '2024-07-28T10:00:00Z',
    content: 'Has anyone noticed the increase in traffic near the new tech park? The city should consider a new flyover.',
    comments: [
      { id: 'c1-1', author: users.rohan, text: 'Absolutely! The congestion during peak hours is unbearable.' },
      { id: 'c1-2', author: users.ananya, text: 'A petition might be a good idea to show the officials how many people are affected.' },
    ],
  },
  {
    id: 'post-2',
    author: users.arjun,
    timestamp: '2024-07-27T18:45:00Z',
    content: 'The new community garden initiative is wonderful! Let\'s organize a cleanup drive this weekend to prepare the area.',
    comments: [],
  },
];


export default function CommunityPage() {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);


  const handleCreatePost = () => {
    if (!isAuthenticated) {
        setAuthModalOpen(true);
        return;
    }
    if (newPostContent.trim() && user) {
      const newPost = {
        id: `post-${Date.now()}`,
        author: { id: user.uid, name: user.displayName || 'Anonymous', avatar: user.photoURL || '' },
        timestamp: new Date().toISOString(),
        content: newPostContent,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1 bg-background px-4 py-8 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold">Community Forum</h1>
            <p className="mt-2 text-muted-foreground">
              <TranslatedText text="Discuss local issues, share ideas, and connect with your neighbors." />
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold font-headline">Create a New Post</h2>
            </CardHeader>
            <CardContent>
              <div className="grid w-full gap-2">
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <Button onClick={handleCreatePost}>Post to Forum</Button>
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
                      <p className="font-semibold">{post.author.name}</p>
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
                  <h3 className="text-sm font-semibold">Comments</h3>
                   {post.comments.map(comment => (
                     <div key={comment.id} className="flex items-start gap-3 text-sm">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <span className="font-semibold">{comment.author.name}</span>
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
                     <Textarea placeholder="Write a comment..." className="min-h-[40px] flex-1 text-sm" />
                     <Button size="sm">Reply</Button>
                   </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <AuthModal open={isAuthModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
