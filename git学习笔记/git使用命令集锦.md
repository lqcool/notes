//安装篇

> 1：windows上面使用git直接到官网下载git安装程序，完成后开始菜单中git->git bash如果能弹出，安装成功。	
> 2：自报家门，打开git bash $ git config --global user.name "Your Name" $ git
> config --global user.email "youEmail@xx.com" git config
> 命令的--global参数，表示这台机器上面的所有GIT仓库都会使用这个配置，也可一对某个指定的仓库使用不同的用户名和Email地址。

//git设置文件上传的上限（遇到>100M的文件上传失败）

> git config --global http.postBuffer 524288000（设置http.postBuffer为500M，上限为500M）

//查看git bash版本

> git version 

//创建文件夹

> mkdir 文件夹名称

//显示当前目录

> pwd

//查看文件

> cat 文件名

//打开文件并编辑（打开编辑器）

> vi 文件名称（或者 vim 文件名称）

//创建.gitignore文件

> (1)进入根目录
>
> (2)touch .gitignore 生成“.gitignore”文件
>
> (3)在.gitignore文件中输入要忽略的文件夹或者文件,例如忽略test文件夹：test/

//将文件夹变为git仓库

> git init

//git init在当前目录下面生成.git目录，用来跟中管理版本库，默认是隐藏的，查看命令如下

> ls -ah

//把文件添加到仓库暂存区进行跟踪

> git add 文件名

//跳过添加到暂存区，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，跳过 `git add` 步骤

> git commit -a -m "提交备注"

//强制把文件添加到git中

> git add -f 文件名称

//把文件提交到仓库

> git commit -m "提交备注"

//查看仓库当前状态

> git status

//要查看尚未暂存的文件更新了哪些部分，不加参数直接输入 `git diff`

> git diff 

//查看已经暂存起来的变化

> git diff --cached

//显示从最近到最远的提交日志，查看历史记录

> git log（格式化加上 --pretty=oneline 参数后更好看,git log --pretty=oneline） 
> 每次提交一个版本，实际上Git就会把他们自动串成一条时间线。

//查看分支合并图

> git log --graph

//git log加入如下参数查看分支合并情况（以一个图的方式展现出来）

> git log --graph --pretty=oneline --abbrev-commit

//git的版本回退

> git reset --hard commit_id

//版本回退到上一个版本

> git reset --hard HEAD^

//回退到上上一个版本
> git reset --hard HEAD^^

//回退到前100个版本
>git reset --hard HEAD~100

//指定到某个版本
>git reset --hard 版本号（不用写全，可以只是一部分）

//git 查看每一次命令记录(在找commit id的时候非常有用，查找需要恢复的版本号)
>git reflog

//丢弃工作去的修改
>git checkout -- 文件名

//暂存区的修改撤销掉（unstage），重新放回工作区(HEAD表示最新版本)
>git reset HEAD file

//删除一个文件
>git rm 文件名
>git commit -m ""(使得删除生效，版本库中也被删除)

//删除一个文件，如果该文件已经被添加到了暂存区，并且这个时候文件被修改，删除需要强制删除

> git rm 文件名 -f

//想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中,仅是从跟踪清单中删除

> git rm --cached 文件名称
>
> 后面可以列出文件或者目录的名字，也可以使用 glob 模式
>
> git rm log/\*.log
>
> 注意到星号 `*` 之前的反斜杠 `\`，因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开，实际上不加反斜杠也可以运行，只不过按照 shell 扩展的话，仅仅删除指定目录下的文件而不会递归匹配。上面的例子本来就指定了目录，所以效果等同，但下面的例子就会用递归方式匹配，所以必须加反斜杠。）。此命令删除所有 `log/` 目录下扩展名为 `.log` 的文件。
>
> git rm log \*~ （会递归删除当前目录及其子目录中所有 `~` 结尾的文件）

//把本地仓库与git服务器仓库关联
>git remote add 分支名称 git仓库地址
>例子：$ git remote add origin https://github.com/LQ55/gitstudy.git（名为origin）
>本地仓库与github仓库的origin分支建立关联例子：

>$ git remote add gitteee https://github.com/LQ55/gitstudy.git(名字为gitteee)

// 把本地库的内容推送到远程，用git push命令，实际上就是把当前分支master推送到远程
>git push -u origin master

//移除远程仓库

> git remote rm 仓库名称，例如git remote rm origin

//重命名远程仓库

> git remote rename 原始仓库名 现在仓库名，例如git remote rename orgin ddd306ddd

//克隆一个本地库
>git clone git仓库地址

//希望在克隆的时候，自己定义要新建的项目名称，可以在后面指定新名称。

> git clone git仓库地址 newName（和上面的差别就是，现在文件名为newName，而不是仓库地址对应的名字）

//git创建分支
>git branch 分支名称

//切换分支
>git checkout 分支名称

//加入参数-b表示创建并切换分支
>git checkout -b 分支名称

//git删除分支
>git branch -d 分支名称

//git强行删除分支（某些时候，开发了并没有用，需要将当前分支，并且当前分支还没有合并）
>git brach -D 分支名称

//查看当前分支(git branch会列出所有分支，当前分支前面会有一个*符号)
>git branch

//合并指定分支到当前分支
>git merge 分支名称

//保存当前工作现场，等以后恢复现场继续工作
>git stash

//回到分支以后查看保存的分支现场（列表展示）
>git stash list

//恢复分支现场
>(1)git stash apply (恢复后stash内容 并不会删除需要 git stash drop 删除)
>(2)git stash pop (恢复的同时把stash内容也删除掉)

//恢复到指定的stash
>(1)先用git stash list 查看，然后恢复到指定的stash
>(2)git stash apply stash@{0}

//查看远程库的信息
>git remote

//查看更佳详细的远程库信息
>git remote -v(查看到可以抓取和推送的origin地址，没有推送权限看不到push地址)

//推送指定分支到分支到远程
>git push origin 分支名称

//使用强制push方法发（这样会覆盖远程分支，丢失修改）
>push -u origin master -f 

//创建远程origin的dev分支到本地
>git checkout -b dev origin/dev

//指定本地dev分支与远程origin/dev分支的连接
>git branch --set-upstream dev origin/dev（有时候本地分支推送失败，因为队友先推送，并且自>己也修改了相同的文件，这个时候git pull 拉取也失败，因为本地分支没有和远程分支建立连接）

//抓取远程分支最新内容到本地
>git pull (有时候抓取以后有冲突，需要手动解决)

//打新标签
>git tag 标签名字

//查看所有标签
>git tag

//对指定commit打标签
>(1)先git log --pretty=oneline --abbrev-commit查看历史提交的commit id
>(2)git tag 标签名称 commit-id

//查看标签信息
>git show 标签名称

//创建带有说明的标签，用-a指定标签名，-m指定说明文字
>git tag -a 标签名 -m “说明文字”

//删除标签
>git tag -d 标签名称

//推送某个标签到远程
>git push origin 标签名称

//一次性推送全部尚未推送到远程的本地标签
>git push origin --tags

//删除已经推送到远程的标签
>(1)先删除本地标签 git tag -d 标签名称
>(2)删除远程标签 git push origin :refs/tags/标签名
>//查看远程分支
>git branch -r 或者 git branch -a
>//查看远程分支详情
>git branch -r -v 或者 git branch -a -v
>//删除远程分支
>(1)git branch -r -d origin/分支名称
>(2)git push origin :分支名称

//移动文件

> git mv file_from file_to

(2018-3-7修订)



