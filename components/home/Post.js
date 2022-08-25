import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { POSTS } from '../../data/posts'

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://i.ibb.co/2YJVssc/like.png',
    likedImageUrl: 'https://img.icons8.com/ios-glyphs/90/fa314a/like'
  },
  {
    name: 'Comment',
    imageUrl: 'https://i.ibb.co/n81bNLF/message.png'
  },
  {
    name: 'Share',
    imageUrl: 'https://i.ibb.co/MDV4xcS/share.png'
  },
  {
    name: 'Save',
    imageUrl: 'https://i.ibb.co/hB922BX/save.png'
  }
]

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post}/>
      </View>
    </View>
  )
}

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: 'white' }}>
      <Text style={{ fontWeight: '700' }}>
        {post.user}
      </Text>
      <Text>{' '}{post.caption}</Text>
    </Text>
  </View>
)

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length  && (
      <Text style={{ color: 'gray' }}>
        View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
)

const Comments = ({post}) => (
  <>
  {post.comments.map((comment, index) => (
    <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
      <Text style={{color: 'white'}}>
        <Text style={{ fontWeight: '600'}}>{comment.user}{' '}</Text>
        {comment.comment}
      </Text>
    </View>
  ))}
  </>
)

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4 }}>
    <Text style={{ color: 'white', fontWeight: '400' }}>{post.likes.toLocaleString('en')} likes</Text>
  </View>
)

const PostHeader = ({ post }) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center'
  }}>

    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>

      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: 'white', marginLeft: 5, fontWeight: '450' }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
  </View>
)

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 450 }}>
    <Image source={{ uri: post.imageUrl }} style={{ height: '100%', resizeMode: 'cover' }} />
  </View>
)

const PostFooter = () => (
  <View style={{ flexDirection: 'row' }}>
    <View style={styles.leftFooterIconsContainer}>
      <Image source={{ uri: 'https://img.icons8.com/ios/344/speech-bubble--v1.png' }} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>

    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
)

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#D34B2E'
  },

  footerIcon: {
    width: 28,
    height: 28,
    marginEnd: 5
  },

  leftFooterIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default Post