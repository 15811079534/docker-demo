'use client';

import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export default function VideoPlayer({
  videoUrl,
  posterUrl = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=675&fit=crop',
  autoPlay = true,
  loop = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const togglePlay = () => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoElement) {
      videoElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      videoElement.currentTime = percentage * videoElement.duration;
    }
  };

  const handleTimeUpdate = () => {
    if (videoElement) {
      const percentage = (videoElement.currentTime / videoElement.duration) * 100;
      setProgress(percentage);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoElement) {
      videoElement.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSpeedMenu(false);
    }
  };

  const handleFullscreen = () => {
    const videoContainer = videoElement?.parentElement?.parentElement;
    if (videoContainer) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainer.requestFullscreen();
      }
    }
  };

  return (
    <div
      className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlay}
    >
      {/* 视频元素 */}
      <div className="aspect-video bg-black relative">
        <video
          ref={(el) => {
            setVideoElement(el);
            if (el) {
              el.addEventListener('timeupdate', handleTimeUpdate);
              el.addEventListener('play', () => setIsPlaying(true));
              el.addEventListener('pause', () => setIsPlaying(false));
            }
          }}
          className="w-full h-full"
          poster={posterUrl}
          onClick={(e) => e.stopPropagation()}
          autoPlay={autoPlay}
          muted
          loop={loop}
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          您的浏览器不支持视频播放。
        </video>

        {/* 中央播放按钮 */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all transform hover:scale-110">
              <Play className="w-10 h-10 text-gray-900 ml-1" />
            </div>
          </div>
        )}

        {/* 底部控制栏 */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 py-4 transition-opacity ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4">
            {/* 播放/暂停按钮 */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
              title={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>

            {/* 音量按钮 */}
            <button
              onClick={toggleMute}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
              title={isMuted ? '取消静音' : '静音'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>

            {/* 进度条 */}
            <div
              className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden hover:h-2 transition-all cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* 倍速控制 */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-3 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors min-w-[60px]"
                title="播放速度"
              >
                <span className="text-white text-sm font-medium">{playbackRate}x</span>
              </button>

              {/* 倍速菜单 */}
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-white/10">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                      className={`w-full px-4 py-2 text-sm text-left transition-colors ${
                        playbackRate === rate
                          ? 'bg-white/20 text-white font-medium'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 全屏按钮 */}
            <button
              onClick={handleFullscreen}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
              title="全屏"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

