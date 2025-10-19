-- migrate:up
-- Description: Sets up pgmq, notification queue, and producer triggers.
-- =============================================================================

-- 1. Enable pgmq extension
CREATE EXTENSION IF NOT EXISTS pgmq;

-- 2. Create the notification jobs queue
SELECT pgmq.create('notification_jobs');

-- 3. Create producer function for new discussion replies
-- This function will be called by a trigger to enqueue a job
CREATE OR REPLACE FUNCTION public.enqueue_new_reply_notification()
RETURNS TRIGGER AS $$
DECLARE
    post_author_id uuid;
BEGIN
    -- Get the author of the parent post
    SELECT author_id INTO post_author_id
    FROM public.discussion_posts
    WHERE id = NEW.post_id;

    -- Only enqueue a job if the replier is not the original post author
    IF NEW.author_id <> post_author_id THEN
        PERFORM pgmq.send(
            'notification_jobs',
            json_build_object(
                'type', 'NEW_REPLY',
                'payload', json_build_object(
                    'postId', NEW.post_id,
                    'replyId', NEW.id,
                    'replierId', NEW.author_id,
                    'authorId', post_author_id
                )
            )
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create the trigger on discussion_replies
CREATE TRIGGER on_new_discussion_reply
AFTER INSERT ON public.discussion_replies
FOR EACH ROW
EXECUTE FUNCTION public.enqueue_new_reply_notification();


-- migrate:down
DROP TRIGGER IF EXISTS on_new_discussion_reply ON public.discussion_replies;
DROP FUNCTION IF EXISTS public.enqueue_new_reply_notification();
SELECT pgmq.drop_queue('notification_jobs');
